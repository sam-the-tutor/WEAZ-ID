import React from 'react';
import '../../assets/Loading.css'




const LoadingComponent = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingComponent;