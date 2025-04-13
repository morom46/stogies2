import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-gray-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © 2024 Stogie's. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Must be 21 or older to purchase. Please enjoy responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 