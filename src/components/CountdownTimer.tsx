// components/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC<{ onExpire: () => void }> = ({ onExpire }) => {
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (seconds === 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return <div>{`Resend OTP in ${seconds}s`}</div>;
};

export default CountdownTimer;
