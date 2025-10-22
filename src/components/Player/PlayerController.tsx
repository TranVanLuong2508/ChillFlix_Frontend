"use client";

import Artplayer from "artplayer";
import { useEffect, useRef } from "react";

import Hls from "hls.js";
import artplayerPluginVttThumbnail from "@artplayer/plugin-vtt-thumbnail";

function playM3u8(video, url, art) {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;

    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
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

    art.on("quality", (quality) => {
      hls.currentLevel = quality.index;
    });

    art.on("level", (level) => {
      const qualityItem = art.quality.find((q) => q.index === level.level);
      if (qualityItem) {
        art.quality.current = qualityItem;
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

  useEffect(() => {
    if ($container.current === null) return;

    const art = new Artplayer({
      container: $container.current,
      url: "https://stream.mux.com/mUtgiS4yYzvECidgrsAz4zslePyGyE2U1U5YQmGbLjM.m3u8",
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
          vtt: "https://image.mux.com/mUtgiS4yYzvECidgrsAz4zslePyGyE2U1U5YQmGbLjM/storyboard.vtt",
        }),
      ],

      poster:
        "https://res.cloudinary.com/chillfliximage/image/upload/v1759825558/w22bp3nhojglsz8xco5h.jpg",
      muted: true,
      theme: "#00B2FF",

      autoplay: true,
      autoSize: true,
      autoMini: true,
      playbackRate: true,
      setting: true,
      screenshot: true,
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
    });

    art.on("ready", () => {
      console.info(art.hls);
    });

    return () => art.destroy(false);
  }, []);

  return <div ref={$container} className="aspect-video"></div>;
};
export default PlayerController;
