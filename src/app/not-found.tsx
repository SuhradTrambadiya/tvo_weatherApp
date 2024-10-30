// NotFound.tsx
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 text-center">
      <h1 className="text-4xl font-bold text-red-500 dark:text-red-300">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-200">City Not Found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        We couldn&apos;t find the weather for the city you searched for. Please check the spelling or try a different city.
      </p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
