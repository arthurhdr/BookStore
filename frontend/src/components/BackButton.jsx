import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn-secondary flex items-center gap-2 mb-6 animate-fade-in"
    >
      <IoArrowBack className="text-lg" />
      Back
    </button>
  );
};

export default BackButton;