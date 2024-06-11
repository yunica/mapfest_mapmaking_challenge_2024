import React from 'react';

const legendColor = ({ colors, milestones }) => {
  return (
    <div className="flex flex-col items-center mb-1">
      <div className="relative flex items-center w-full">
        <div className="relative flex-grow h-3">
          <div className="absolute inset-0 flex">
            {colors.map((color, index) => (
              <div key={index} className="flex-grow" style={{ background: color }}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex justify-between w-full mt-0">
        {milestones.map((milestone, index) => (
          <span key={index} className="text-xs">
            {milestone}
          </span>
        ))}
      </div>
    </div>
  );
};

export default legendColor;
