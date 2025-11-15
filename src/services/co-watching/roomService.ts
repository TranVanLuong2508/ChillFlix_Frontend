import privateAxios from "@/lib/privateAxios";
import { IBackendRes } from "@/types/backend.type";
import { roomPayload, roomRes } from "@/types/co_watching.type";

const roomServices = {
  createRoom: (payload: roomPayload): Promise<IBackendRes<roomRes>> => {
    return privateAxios.post("/co-watching", payload);
  }
}

export default roomServices;