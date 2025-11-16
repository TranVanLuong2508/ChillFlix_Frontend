import Artplayer from 'artplayer';
import { EpisodeStream } from './episode.type';
import { Film } from './film.type';

export interface roomRes {
  roomId: string;
  name: string;
  hostId: number;
  episodeId: string;
  episode: EpisodeStream;
  thumbUrl: string;
  isLive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  duration: number;
}

export interface roomCreatedData {
  room: roomRes,
  film: Film,
}

export interface roomPayload {
  name: string,
  isPrivate: boolean,
  thumbUrl: string,
  episodeId: string,
}

export type SyncMode = 'initial' | 'manual';

export interface SyncEvent {
  type: 'play' | 'pause' | 'seek' | 'requestSync' | 'syncResponse';
  currentTime?: number;
  isPlaying?: boolean;
}

export interface VideoSyncState {
  isHandlingRemoteEvent: boolean;
  hasInitialSynced: boolean;
  userInteracted: boolean;
  showInteractionPrompt: boolean;
  syncMode: SyncMode;
}

export interface VideoSyncCallbacks {
  onShowInteractionPrompt: (show: boolean) => void;
  onUserInteracted: (interacted: boolean) => void;
}

export interface RemoteEventHandlerParams {
  event: SyncEvent;
  art: Artplayer | null;
  emitSync: (event: SyncEvent) => void;
  syncMode: SyncMode;
  isHandlingRemoteEvent: React.MutableRefObject<boolean>;
  hasInitialSynced: React.MutableRefObject<boolean>;
  onShowInteractionPrompt: (show: boolean) => void;
}

export interface LocalControlParams {
  emitSync: (event: SyncEvent) => void;
  syncMode: SyncMode;
  isHandlingRemoteEvent: React.MutableRefObject<boolean>;
  hasInitialSynced: React.MutableRefObject<boolean>;
  artInstanceRef: React.MutableRefObject<Artplayer | null>;
}