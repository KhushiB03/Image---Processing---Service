import { useState } from "react";
import api from "../services/api";

interface props {
  imageId: string;
  setImageUrl: (url: string) => void;
}

export default function TransformForm({ imageId, setImageUrl }: props) {
  //vars
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [rotate, setRotate] = useState("");
  const [format, setFormat] = useState("");

  const handleTransform = async () => {
    try {
      const res = await api.post(`/images/${imageId}/transform`, {
        width,
        height,
        rotate,
        format,
      });
      setImageUrl(res.data.image.ImageUrl);
      alert("transformation done");
    } catch (error) {
      alert(`error`);
    }
  };

  return (
    <div>
      <h1>Transform</h1>
      <input
        placeholder="width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />

      <input
        placeholder="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <input
        placeholder="rotate"
        value={rotate}
        onChange={(e) => setRotate(e.target.value)}
      />

      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpeg">jpeg</option>
        <option value="png">png</option>
        <option value="webp">webp</option>
      </select>
      <button onClick={handleTransform}>apply</button>
    </div>
  );
}
