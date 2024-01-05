import React from "react";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex items-center">
        {text ? (
          <p className="ml-3 text-gray-100">{text}</p>
        ) : (
          <div className="animate-spin rounded-full border-t-4 border-blue-800 border-opacity-25 h-12 w-12"></div>
        )}
      </div>
    </div>
  );
};

export default Loading;
