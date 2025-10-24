"use client";

import Hls from "hls.js";
import Artplayer from "artplayer";
import { useEffect, useRef } from "react";
import artplayerPluginVttThumbnail from "@artplayer/plugin-vtt-thumbnail";

const PlayerNew = () => {
  const artRef = useRef<HTMLDivElement>(null);

  const playM3u8 = (video: HTMLVideoElement, url: string, art: Artplayer) => {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();

      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      art.hls = hls;
      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  };

  useEffect(() => {
    if (!artRef.current) return;

    const art = new Artplayer({
      container: artRef.current,
      url: "https://stream.mux.com/4dfQi4aSj28rdrPWGBkxdzRylMw2SJXR5wBz3YQLMNQ.m3u8",
      type: "m3u8",
      customType: {
        m3u8: playM3u8,
      },

      plugins: [
        artplayerPluginVttThumbnail({
          vtt: "https://image.mux.com/4dfQi4aSj28rdrPWGBkxdzRylMw2SJXR5wBz3YQLMNQ/storyboard.vtt",
        }),
      ],

      poster:
        "https://res.cloudinary.com/chillfliximage/image/upload/v1759825558/w22bp3nhojglsz8xco5h.jpg",

      // config common
      theme: "#00B2FF",
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
      // icons: {
      //   loading: '<img src="/assets/img/ploading.gif">', // loading icon
      //   state: '<img src="/assets/img/state.png">', // nút play/pause
      // },
    });

    art.on("ready", () => {
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

export default PlayerNew;
