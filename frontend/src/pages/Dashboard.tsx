import { useState } from "react";

import UploadForm from "../components/UploadForm";
import TransformForm from "../components/TransformForm";

export default function Dashboard() {
  const [imageId, setImageId] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h1>Image Processing Dashboard</h1>

      <UploadForm setImageId={setImageId} setImageUrl={setImageUrl} />

      {imageUrl && (
        <>
          <h3>Preview</h3>

          <img src={imageUrl} alt="preview" width="300" />
        </>
      )}

      {imageId && 
      <TransformForm imageId={imageId} setImageUrl={setImageUrl} />}
    </div>
  );
}
