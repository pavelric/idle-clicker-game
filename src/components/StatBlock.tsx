import React from 'react';
import { Stats } from '../types';

interface StatBlockProps {
  stats: Stats;
}

const StatBlock: React.FC<StatBlockProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="font-semibold capitalize">{key}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatBlock;