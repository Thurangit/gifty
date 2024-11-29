import React from 'react';

const Snowfall = ({ 
  snowflakeCount = 50, 
  snowflakeColor = 'bg-red-200', 
  animationDuration = 10 
}) => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(snowflakeCount)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute ${snowflakeColor} rounded-full animate-snow`} 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 10}s`, 
              width: `${Math.random() * 4}px`, 
              height: `${Math.random() * 4}px` 
            }} 
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes snowfall { 
          0% { transform: translateY(-10vh) rotate(0deg); } 
          100% { transform: translateY(110vh) rotate(360deg); } 
        } 
        .animate-snow { 
          animation: snowfall ${animationDuration}s linear infinite; 
        }
      `}</style>
    </>
  );
};

export default Snowfall;