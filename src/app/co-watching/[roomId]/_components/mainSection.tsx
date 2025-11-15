"use client";

import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import type { SyncEvent, SyncMode } from "@/types/co_watching.type";

import { useVideoSyncControls } from "@/services/co-watching/useVideoSyncControl";
import { useVideoSyncHandler } from "@/hooks/useVideoSyncHandler";
import { useWatchTogether } from "@/hooks/useWatchTogether";

import Player from "./player";
import { Button } from "@/components/ui/button";
import { Copy, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MainSectionProps {
  roomId: string;
}

export const MainSection = ({ roomId }: MainSectionProps) => {
  const artInstanceRef = useRef<Artplayer | null>(null);
  const isHandlingRemoteEvent = useRef(false);
  const hasInitialSynced = useRef(false);

  const [userInteracted, setUserInteracted] = useState(false);
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);
  const [syncMode, setSyncMode] = useState<SyncMode>('initial');

  const { handleRemoteEvent } = useVideoSyncHandler();

  const { emitSync, isConnected, isReady, socketId } = useWatchTogether(roomId, async (event: SyncEvent) => {
    await handleRemoteEvent({
      event,
      art: artInstanceRef.current,
      emitSync,
      syncMode,
      isHandlingRemoteEvent,
      hasInitialSynced,
      onShowInteractionPrompt: setShowInteractionPrompt
    });
  }
  );

  const {
    handlePlay,
    handlePause,
    handleSeek,
    handleArtReady,
    handleManualSync
  } = useVideoSyncControls({
    emitSync,
    syncMode,
    isHandlingRemoteEvent,
    hasInitialSynced,
    artInstanceRef
  });

  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        setShowInteractionPrompt(false);
        console.log('User interacted with page');
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [userInteracted]);

  return (
    <div className="">
      <div className="px-4 pb-10">
        <Player
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleArtReady={handleArtReady}
          handleSeek={handleSeek}
          handleManualSync={handleManualSync}
        />
      </div>

    </div>
  )
}