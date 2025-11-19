import { MainSection } from "./_components/mainSection";


interface LiveRoomPageProps {
  params: {
    roomId: string,
  }
}

const LiveRoomPage = async ({ params }: LiveRoomPageProps) => {
  const { roomId } = await params;

  return (
    <div className="text-white">
      <MainSection roomId={roomId} />
    </div>
  )
}
export default LiveRoomPage