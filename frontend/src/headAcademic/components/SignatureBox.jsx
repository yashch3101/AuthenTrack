import React, { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function SignatureBox({ signatureImage, setSignatureImage }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00eaff";
    ctx.lineCap = "round";
  }, []);

  function start(e) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  }

  function draw(e) {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  }

  function stopDrawing() {
    setDrawing(false);
  }

  async function save() {
  const canvas = canvasRef.current;
  if (!canvas) {
    alert("Please draw signature first!");
    return;
  }

  const data = canvas.toDataURL("image/png");

  setSignatureImage(data);

  alert("Signature Saved!");
}


  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImage(null);
  }

  function upload(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    setSignatureImage(reader.result);
  };

  reader.readAsDataURL(file);
}

  return (
    <div className="bg-[#071122]/60 border border-cyan-500/20 rounded-2xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">
        Digital Signature
      </h2>

      <div className="w-full h-40 bg-[#00121a] rounded-lg overflow-hidden border border-cyan-600/30 flex items-center justify-center">
        {!signatureImage ? (
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            onMouseDown={start}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full cursor-crosshair"
          />
        ) : (
          <img src={signatureImage} alt="sign" className="object-contain h-full" />
        )}
      </div>

      <div className="flex gap-3 mt-4 justify-center">
        <button
          onClick={save}
          className="px-4 py-2 bg-cyan-600/40 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={clear}
          className="px-4 py-2 bg-red-600/40 rounded-lg"
        >
          Clear
        </button>

        <label className="px-4 py-2 bg-blue-600/40 rounded-lg cursor-pointer flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={upload}
          />
        </label>
      </div>
    </div>
  );
}