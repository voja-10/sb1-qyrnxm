import React from 'react';

interface ColorHistoryProps {
  history: string[];
  onSelectColor: (color: string) => void;
}

const ColorHistory: React.FC<ColorHistoryProps> = ({ history, onSelectColor }) => {
  return (
    <div className="mt-4">
      <h3>Color History</h3>
      <div className="d-flex flex-wrap">
        {history.map((color, index) => (
          <div
            key={index}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: color,
              margin: '2px',
              cursor: 'pointer',
              border: '1px solid #ccc'
            }}
            onClick={() => onSelectColor(color)}
            title={color}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorHistory;