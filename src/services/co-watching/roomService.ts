import privateAxios from "@/lib/privateAxios";
import publicAxios from "@/lib/publicAxios";
import { IBackendRes } from "@/types/backend.type";
import { roomCreatedData, roomPayload } from "@/types/co_watching.type";

const roomServices = {
  createRoom: (payload: roomPayload): Promise<IBackendRes<roomCreatedData>> => {
    return privateAxios.post("/co-watching", payload);
  },
  getAllStream: (current: number, pageSize: number) => {
    return publicAxios.get(`/co-watching?current=${current}&pageSize=${pageSize}`);
  }
}

export default roomServices;