import React, { useState, useEffect } from 'react';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="car-animation">
          <div className="car-body">
            <div className="car-roof"></div>
            <div className="car-window"></div>
            <div className="car-wheel front"></div>
            <div className="car-wheel back"></div>
          </div>
          <div className="road">
            <div className="road-line"></div>
            <div className="road-line"></div>
            <div className="road-line"></div>
          </div>
        </div>
        <div className="loading-text">
          <span className="brand-title">ANAS</span>
          <span className="brand-subtitle">RENT CAR</span>
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
