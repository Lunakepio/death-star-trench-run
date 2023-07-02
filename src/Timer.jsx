import React, { useState, useEffect } from 'react';

function TimerComponent() {
  const [time, setTime] = useState(300000); // Set initial time in milliseconds (e.g., 10000 ms = 10 seconds)
  
  useEffect(() => {
    if(time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1);
      return () => clearInterval(timer);
    }
  }, [time]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return (
    <div>
      <p>{minutes}:{seconds < 10 ? '0' + seconds : seconds}:{milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds}</p>
    </div>
  );
}

export default TimerComponent;
