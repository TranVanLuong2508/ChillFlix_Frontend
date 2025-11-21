import { UploadAvt } from "./upload"

interface AvatarUserProps {
  imageUrl: string;
  setAvtUrl: (url: string) => void;
}

export const AvatarUser = ({ imageUrl, setAvtUrl }: AvatarUserProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-40 h-40 rounded-full flex items-center justify-center shadow-xl border-4"
        style={{
          backgroundColor: "#FFD875",
          borderColor: "#FFD875",
          boxShadow: "0 12px 24px rgba(255, 216, 117, 0.3)",
        }}
      >
        <img
          src={imageUrl}
          alt="User Avatar"
          width={30}
          height={30}
          className="w-40 h-40 rounded-full cursor-pointer transition border-2 border-yellow-400/50 object-cover object-center"
        />
      </div>
      <UploadAvt setAvtUrl={setAvtUrl} />
    </div>
  )
}