import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ColorHistory from './ColorHistory';

const ImageColorPicker: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleImageClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

    setSelectedColor(color);
    addToHistory(color);
  };

  const addToHistory = (newColor: string) => {
    setHistory(prevHistory => {
      const updatedHistory = [newColor, ...prevHistory.filter(c => c !== newColor)];
      return updatedHistory.slice(0, 20);
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Pick Color from Image</h1>
      <div {...getRootProps()} className={`dropzone p-4 mb-4 text-center ${isDragActive ? 'border-primary' : 'border'}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select an image</p>
        )}
      </div>
      {imageUrl && (
        <div className="row">
          <div className="col-md-8">
            <canvas
              ref={canvasRef}
              onClick={handleImageClick}
              style={{ maxWidth: '100%', cursor: 'crosshair' }}
            >
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </canvas>
          </div>
          <div className="col-md-4">
            {selectedColor && (
              <div>
                <h3>Selected Color</h3>
                <div className="mb-3">
                  <div style={{ width: '100px', height: '100px', backgroundColor: selectedColor, border: '1px solid #ccc' }}></div>
                </div>
                <div className="mb-2">
                  <strong>HEX:</strong> {selectedColor}
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(selectedColor)}>Copy</button>
                </div>
                <div className="mb-2">
                  <strong>RGB:</strong> {`rgb(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)})`}
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(`rgb(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)})`)}>Copy</button>
                </div>
                <div className="mb-2">
                  <strong>HSL:</strong> {`hsl(${Math.round(parseInt(selectedColor.slice(1, 3), 16) / 255 * 360)}, ${Math.round(parseInt(selectedColor.slice(3, 5), 16) / 255 * 100)}%, ${Math.round(parseInt(selectedColor.slice(5, 7), 16) / 255 * 100)}%)`}
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(`hsl(${Math.round(parseInt(selectedColor.slice(1, 3), 16) / 255 * 360)}, ${Math.round(parseInt(selectedColor.slice(3, 5), 16) / 255 * 100)}%, ${Math.round(parseInt(selectedColor.slice(5, 7), 16) / 255 * 100)}%)`)}>Copy</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ColorHistory history={history} onSelectColor={setSelectedColor} />
    </div>
  );
};

export default ImageColorPicker;