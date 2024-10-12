import React from 'react';
import { Scene } from '../types';

interface MenuProps {
  setScene: (scene: Scene) => void;
}

const Menu: React.FC<MenuProps> = ({ setScene }) => {
  const menuItems: Scene[] = ['train', 'fight', 'character', 'shop'];

  return (
    <div className="flex flex-col space-y-2">
      {menuItems.map((item) => (
        <button
          key={item}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setScene(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Menu;