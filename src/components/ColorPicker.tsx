import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import ColorHistory from './ColorHistory';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#ffffff');
  const [history, setHistory] = useState<string[]>([]);

  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
    addToHistory(color.hex);
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
      <h1 className="mb-4">Color Picker</h1>
      <div className="row">
        <div className="col-md-6">
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="col-md-6">
          <h3>Selected Color</h3>
          <div className="mb-3">
            <div style={{ width: '100px', height: '100px', backgroundColor: color, border: '1px solid #ccc' }}></div>
          </div>
          <div className="mb-2">
            <strong>HEX:</strong> {color}
            <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(color)}>Copy</button>
          </div>
          <div className="mb-2">
            <strong>RGB:</strong> {`rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})`}
            <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(`rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})`)}>Copy</button>
          </div>
          <div className="mb-2">
            <strong>HSL:</strong> {`hsl(${Math.round(parseInt(color.slice(1, 3), 16) / 255 * 360)}, ${Math.round(parseInt(color.slice(3, 5), 16) / 255 * 100)}%, ${Math.round(parseInt(color.slice(5, 7), 16) / 255 * 100)}%)`}
            <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(`hsl(${Math.round(parseInt(color.slice(1, 3), 16) / 255 * 360)}, ${Math.round(parseInt(color.slice(3, 5), 16) / 255 * 100)}%, ${Math.round(parseInt(color.slice(5, 7), 16) / 255 * 100)}%)`)}>Copy</button>
          </div>
        </div>
      </div>
      <ColorHistory history={history} onSelectColor={setColor} />
    </div>
  );
};

export default ColorPicker;