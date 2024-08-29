import React from 'react';

interface ErrorProps {
  message: string;
  onRetry?: () => void; 
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="text-red-500 text-lg font-bold mb-4">
        {message || 'Something went wrong.'}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
