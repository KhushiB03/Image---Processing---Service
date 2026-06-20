import { useState } from "react";
import api from "../services/api";

interface props {
  setImageId: (id: string) => void;
  setImageUrl: (id: string) => void;
}

export default function UploadForm({ setImageId, setImageUrl }: props) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await api.post("/images", formData);
      setImageId(res.data.image._id);
      setImageUrl(res.data.image.imageUrl);
      alert("uplod successful");
    } catch {
      alert("upload failed");
    }
  };
  return (
    <div>
      <h2>Upload image</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
