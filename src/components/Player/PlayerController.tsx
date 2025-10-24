import { useEffect, useRef, useState } from "react";

import Artplayer from "artplayer";
import type { Artplayer as ArtplayerType } from "artplayer";
import artplayerPluginVttThumbnail from "@artplayer/plugin-vtt-thumbnail";

import Hls from "hls.js";

function playM3u8(video: HTMLVideoElement, url: string, art: ArtplayerType) {
  if (Hls.isSupported()) {
    if (art.hls) {
      console.log("Huy art hls");
      art.hls.destroy();
    }
    const hls = new Hls({
      lowLatencyMode: true,
      maxBufferLength: 8,
      maxMaxBufferLength: 15,
      maxBufferHole: 0.1,
      liveSyncDuration: 2,
      startLevel: -1,
      testBandwidth: true,
    });

    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;

    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log(
        "Available quality levels:",
        data.levels.map((l) => l.height)
      );

      const levels = data.levels;

      art.quality = [
        {
          default: true,
          html: "Auto",
          index: -1,
        },
        ...levels.map((level, index) => {
          return {
            html: `${level.height}p`,
            index: index,
          };
        }),
      ];
    });

    hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
      const currentLevel = hls.levels[data.level];
      if (currentLevel) {
        art.notice.show = `Auto: ${currentLevel.height}`;
      }
    });

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            art.notice.show = "Lỗi mạng. Đang thử tải lại...";
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            art.notice.show = "Lỗi phát video. Đang khôi phục...";
            hls.recoverMediaError();
            break;
          default:
            art.notice.show = "Không thể phát video.";
            hls.destroy();
            break;
        }
      }
    });

    art.on("quality", (quality) => {
      if (quality.index === -1) {
        hls.currentLevel = -1;
      } else {
        // hls.nextLevel = quality.index;
        // hls.currentLevel = quality.index;
        // hls.swapAudioCodec();
        // hls.startLoad();

        hls.currentLevel = quality.index;
        hls.stopLoad();
        hls.startLoad();

        art.notice.show = `Đã chuyển sang ${quality.html}`;
      }
    });

    art.on("destroy", () => hls.destroy());
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  } else {
    art.notice.show = "Unsupported playback format: m3u8";
  }
}

const PlayerController = () => {
  const $container = useRef<null | HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!$container.current || !mounted) return;

    console.log("Start stream");

    const art = new Artplayer({
      container: $container.current,
      url: "https://stream.mux.com/4dfQi4aSj28rdrPWGBkxdzRylMw2SJXR5wBz3YQLMNQ.m3u8",
      type: "m3u8",
      customType: {
        m3u8: playM3u8,
      },

      // thumbnails: {
      //   url: "https://image.mux.com/mUtgiS4yYzvECidgrsAz4zslePyGyE2U1U5YQmGbLjM/storyboard.png",
      //   number: 50,
      //   column: 5,
      // },
      plugins: [
        artplayerPluginVttThumbnail({
          vtt: "https://image.mux.com/4dfQi4aSj28rdrPWGBkxdzRylMw2SJXR5wBz3YQLMNQ/storyboard.vtt",
        }),
      ],

      poster:
        "https://res.cloudinary.com/chillfliximage/image/upload/v1759825558/w22bp3nhojglsz8xco5h.jpg",
      muted: false,
      theme: "#00B2FF",

      autoplay: true,
      autoSize: true,
      autoMini: true,
      playbackRate: true,
      setting: true,
      screenshot: false,
      hotkey: true,
      pip: true,
      fullscreen: true,
      airplay: true,

      // config play back *****
      // id: "your-url-id",
      // autoPlayback: true,
      // config play back

      // for mobile
      gesture: false,
      fastForward: true,
      autoOrientation: true,

      // custom style
      // icons: {
      //   loading: '<img src="/assets/img/ploading.gif">', // loading icon
      //   state: '<img src="/assets/img/state.png">', // nút play/pause
      // },
    });

    art.on("ready", () => {
      console.info(art.hls);
    });

    return () => {
      art.destroy();
      if (art.hls) art.hls.destroy();
    };
  }, [mounted]);

  if (!mounted) return null;
  return <div ref={$container} className="aspect-video"></div>;
};
export default PlayerController;
