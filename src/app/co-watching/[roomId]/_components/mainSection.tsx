"use client";

import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import type { SyncEvent, SyncMode } from "@/types/co_watching.type";

import { useVideoSyncControls } from "@/services/co-watching/useVideoSyncControl";
import { useVideoSyncHandler } from "@/hooks/useVideoSyncHandler";
import { useWatchTogether } from "@/hooks/useWatchTogether";

import Player from "./player";
import { useCoWatchingStore } from "@/stores/co-watchingStore";
import { useFilmStore } from "@/stores/filmStore";
import Loading from "../loading";

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

  const { dataRoom, getRoomData } = useCoWatchingStore();
  const { partData, getPartData } = useFilmStore();
  const { handleUpdateEpisode } = useCoWatchingStore();

  useEffect(() => {
    if (!dataRoom || dataRoom.room.roomId !== roomId) {
      getRoomData(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    const filmId = dataRoom?.filmData.film.filmId
    if (filmId && (!partData || partData[0].filmId !== filmId)) {
      getPartData(filmId);
    }
  }, [dataRoom?.filmData.film.filmId]);

  const { handleRemoteEvent } = useVideoSyncHandler();

  const { emitSync, isConnected, isReady, socketId } = useWatchTogether(
    roomId,
    async (event: SyncEvent) => {
      await handleRemoteEvent({
        event,
        art: artInstanceRef.current,
        emitSync,
        syncMode,
        isHandlingRemoteEvent,
        hasInitialSynced,
        onShowInteractionPrompt: setShowInteractionPrompt,
        handleUpdateEpisode,
      });
    }
  );

  const {
    handlePlay,
    handlePause,
    handleSeek,
    handleArtReady,
    handleManualSync,
    handleSyncEpisode,
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

  if (!dataRoom || !dataRoom.filmData || !partData) {
    return <Loading />
  }

  return (
    <div className="px-10 pb-10 pt-6">
      <Player
        dataRoom={dataRoom}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleArtReady={handleArtReady}
        handleSeek={handleSeek}
        handleManualSync={handleManualSync}
        handleSyncEpisode={handleSyncEpisode}
      />
    </div>
  )
}