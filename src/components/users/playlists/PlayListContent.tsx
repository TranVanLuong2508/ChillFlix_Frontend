"use client";

import { useState, useEffect } from "react";
import { userServices } from "@/services";
import ListCardPlayListFilms from "./ListCardPlayListFilms";
import { IPlaylist, IPlaylistDetail } from "@/types/user.type";
import { Plus } from "lucide-react";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { PlayListMessage } from "@/constants/messages/user.message";
import CreatePlaylistModal from "./CreatePlaylistModal";
import EditPlaylistModal from "./EditPlaylistModal";

export default function PlaylistContent({
  userPlaylists,
  fetchPlaylists,
  isLoadingPlaylist,
}: {
  userPlaylists: IPlaylist[];
  fetchPlaylists: () => void;
  isLoadingPlaylist: boolean;
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [playlistDetail, setPlaylistDetail] = useState<IPlaylistDetail>();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPlaylistName, setSelectedPlaylistName] = useState("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    if (selectedPlaylist) {
      fetchPlaylistDetail(selectedPlaylist);
    }
  }, [selectedPlaylist]);

  const fetchPlaylistDetail = async (playlistId: string) => {
    try {
      setIsLoadingDetail(true);
      const res = await userServices.CallGetPlaylistDetail(playlistId);
      if (res && res.EC === 1) {
        setPlaylistDetail(res.data);
      }
    } catch (eror) {
      toast.error(PlayListMessage.errorFetchDetail);
      console.log("Error form fetch detail playlist", eror);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      setIsLoadingDetail(false);
    }
  };

  return (
    <>
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white ">Danh sách</h1>
          <button
            onClick={() => setOpenCreate(true)}
            className="px-4 py-2 rounded-full border border-gray-500 text-white hover:bg-white/10 transition flex cursor-pointer items-center"
          >
            <Plus size={18} /> Thêm mới
          </button>
        </div>

        {userPlaylists.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 text-lg">
            Bạn chưa có danh sách nào
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {userPlaylists.map((pl) => (
              <div
                key={pl.playlistId}
                onClick={() => setSelectedPlaylist(pl.playlistId)}
                className={`cursor-pointer rounded-xl p-5 border ${
                  selectedPlaylist === pl.playlistId
                    ? "border-yellow-400"
                    : "border-[#32343d]"
                } bg-[#25272f] hover:border-yellow-300 transition`}
              >
                <p className="text-white font-semibold text-lg truncate">
                  {pl.playlistName}
                </p>
                <p className="flex items-center text-gray-400 text-sm mt-2">
                  <span>
                    <Play />
                  </span>
                  <span className="ml-1">{pl.total_film} phim</span>
                </p>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedPlaylistName(pl.playlistName);
                    setOpenEdit(true);
                  }}
                >
                  {" "}
                  <p className="text-xs text-gray-400 underline mt-3">Sửa</p>
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedPlaylist && (
          <div>
            {playlistDetail &&
              playlistDetail.films &&
              playlistDetail.films.length > 0 && (
                <ListCardPlayListFilms
                  isLoadingDetail={isLoadingDetail}
                  playlistDetail={playlistDetail}
                  fetchPlaylists={fetchPlaylists}
                  fetchPlaylistDetail={() =>
                    fetchPlaylistDetail(selectedPlaylist)
                  }
                />
              )}
          </div>
        )}
      </div>

      <CreatePlaylistModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      <EditPlaylistModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        playlistName={selectedPlaylistName}
        playlistId={selectedPlaylist ?? ""}
      />
    </>
  );
}
