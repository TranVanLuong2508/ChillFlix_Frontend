import uploadFileService from "@/services/uploadFileService";
import { Upload } from "lucide-react";
import { useRef } from "react";

export const UploadAvt = ({ setAvtUrl }: { setAvtUrl: (url: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadFileService.uploadFile(formData);
      if (res.EC === 0) {
        setAvtUrl(res.data?.url || "");
      }
    }
  };

  return (
    <div>
      <input type="file" ref={inputRef} hidden onChange={handleFileChange} />
      <button
        className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all"
        style={{
          backgroundColor: "rgba(255, 216, 117, 0.15)",
          color: "#FFD875",
          borderColor: "rgba(255, 216, 117, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 216, 117, 0.25)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 216, 117, 0.15)"
        }}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <Upload size={16} />
        Ảnh có sẵn
      </button>
    </div>
  )
}