import { MainSection } from "./_components/mainSection";
import { ExitButton } from "./_components/exitButton";


interface LiveRoomPageProps {
  params: {
    roomId: string,
  }
}

const LiveRoomPage = async ({ params }: LiveRoomPageProps) => {
  const { roomId } = await params;

  return (
    <div className="text-white">
      <ExitButton />
      <MainSection roomId={roomId} />
    </div>
  )
}
export default LiveRoomPage