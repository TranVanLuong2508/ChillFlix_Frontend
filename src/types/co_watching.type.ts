import Artplayer from 'artplayer';

export interface roomRes {
  roomId: string,
  createdAt: string,
}

export interface roomPayload {
  name: string,
  hostId: number,
  isPrivate: boolean,
  thumbUrl: string,
  videoId: string,
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