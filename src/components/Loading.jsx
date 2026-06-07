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
        <img src="/assets/image.png" alt="ANAS RENT CAR" className="loading-logo-img" />
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
