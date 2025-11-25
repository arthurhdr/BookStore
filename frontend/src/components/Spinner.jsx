import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          animate-spin rounded-full 
          border-2 border-slate-300 border-t-primary-500
        `}
      />
    </div>
  );
};

export default Spinner;