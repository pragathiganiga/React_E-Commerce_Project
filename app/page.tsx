import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-screen-lg w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-500 mb-4">
          Welcome to the Fashion World
        </h1>
        <p className="text-base md:text-lg text-pink-400">
          This is the homepage of my application.
        </p>
      </div>
    </div>
  );
}
