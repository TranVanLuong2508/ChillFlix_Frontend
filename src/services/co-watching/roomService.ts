import privateAxios from "@/lib/privateAxios";
import publicAxios from "@/lib/publicAxios";
import { IBackendRes } from "@/types/backend.type";
import { getAllStreamRes, roomCreatedData, roomPayload } from "@/types/co_watching.type";

const roomServices = {
  createRoom: (payload: roomPayload): Promise<IBackendRes<roomCreatedData>> => {
    return privateAxios.post("/co-watching", payload);
  },
  getAllStream: (
    current: number,
    pageSize: number,
    query: {
      isLive?: boolean;
      hostId?: number;
    }): Promise<IBackendRes<getAllStreamRes>> => {
    return publicAxios.get(`/co-watching`, {
      params: {
        current,
        pageSize,
        ...(query.isLive !== undefined && { isLive: query.isLive }),
        ...(query.hostId !== undefined && { hostId: query.hostId }),
      }
    });
  }
}

export default roomServices;