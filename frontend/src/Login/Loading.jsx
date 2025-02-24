import React from 'react';

const Loading = () => {
  return (
    <div className="relative w-48 h-1.5 bg-gray-200 overflow-hidden">
    <div 
      className="absolute top-0 left-0 h-full w-1/2 animate-loading"
      style={{
        background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #2563eb)',
        animation: 'loading 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
    />
  </div>
  );
};

export default Loading;