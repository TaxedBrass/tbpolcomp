import React from 'react';

export function Slider({ value, onValueChange, min = 0, max = 100 }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className="w-full"
    />
  );
}
