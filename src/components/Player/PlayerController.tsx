import { useEffect, useRef } from "react";

import Hls from "hls.js";
import Artplayer from "artplayer";
import artplayerPluginVttThumbnail from "@artplayer/plugin-vtt-thumbnail";

interface PlayerControllerProps {
  videoUrl: string;
  posterUrl: string;
}

const PlayerController = ({ videoUrl, posterUrl }: PlayerControllerProps) => {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (artRef.current) {
      artRef.current.setAttribute("tabindex", "0");
      artRef.current.focus();

      const headerHeight = 86;
      const y =
        artRef.current.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const playM3u8 = (video: HTMLVideoElement, url: string, art: Artplayer) => {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();

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
        console.log("Available levels: ", data.levels);

        const defaultQuality = data.levels[data.levels.length - 1].height;

        const qualities = data.levels.map((level, index) => {
          return {
            default: level.height === defaultQuality,
            html: `${level.height}`,
            url: url,
            level: index,
          };
        });

        qualities.unshift({
          default: false,
          html: `Auto`,
          url: url,
          level: -1,
        });

        art.setting.update({
          name: "quality",
          tooltip: "Quality",
          html: "Quality",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/></svg>',
          selector: qualities.reverse(),
          onSelect: function (item: any) {
            console.log("Select quality: ", item.html);

            if (item.level === -1) {
              hls.currentLevel = -1;
            } else {
              hls.currentLevel = item.level;
            }

            return item.html;
          },
        });
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        const level = hls.levels[data.level];
        console.log(`Switched to ${level.height}p`);
        art.notice.show = `Quality: ${level.height}P`;
      });

      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  };

  useEffect(() => {
    if (!artRef.current || !videoUrl) return;

    const art = new Artplayer({
      container: artRef.current,
      url: videoUrl,
      type: "m3u8",
      customType: {
        m3u8: playM3u8,
      },

      plugins: [
        artplayerPluginVttThumbnail({
          vtt: "https://image.mux.com/4dfQi4aSj28rdrPWGBkxdzRylMw2SJXR5wBz3YQLMNQ/storyboard.vtt",
        }),
      ],

      poster: posterUrl,

      // config common
      theme: "#00B2FF", // #B20710
      autoSize: true,
      autoMini: true,
      playbackRate: true,
      setting: true,
      hotkey: true,
      pip: true,
      fullscreen: true,

      // config mobile
      gesture: false,
      fastForward: true,
      autoOrientation: true,

      // config play back *****
      // id: "your-url-id",
      // autoPlayback: true,
      // config play back

      // custom style
      icons: {
        // loading: '<img src="/assets/img/ploading.gif">', // loading icon
        state: '<img src="/media/play.png">', // nút play/pause
      },
    });

    art.on("ready", () => {
      const bottom = art.template.$bottom;
      if (bottom) bottom.style.background = "none";

      const info = art.template.$info;
      if (info) {
        info.style.top = "50%";
        info.style.left = "50%";
        info.style.right = "auto";
        info.style.transform = "translate(-50%, -50%)";
      }

      console.info(art.hls);
    });

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, []);

  return <div ref={artRef} className="aspect-video"></div>;
};

export default PlayerController;
