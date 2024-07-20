import { useEffect, useState } from "react";

type TimerProps = {
  endDateTimeStamp: number;
}

export const Timer: React.FC<TimerProps> = ({ endDateTimeStamp }) => {
  const [betEndCountdown, setBetEndCountdown] = useState<string>('');

  const calculateTimeRemaining = (timestamp: number): string => {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = Number(timestamp) - currentTime;
    const formattedTime = new Date(remainingTime * 1000).toISOString().substr(14, 5);
    return `${formattedTime}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      // Assuming calculateTimeRemaining returns a string like "05:00" for 5 minutes
      if (endDateTimeStamp) {
        const endCountdown = calculateTimeRemaining(endDateTimeStamp);
        setBetEndCountdown(endCountdown);
      }
    };

    // Update countdowns every second
    const countdownInterval = setInterval(updateCountdowns, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [endDateTimeStamp]);

  return (
    <div className="text-center">
      {endDateTimeStamp && (
        <div className="mt-20">
          {endDateTimeStamp > BigInt(0) && (
            <div>
              Current round Betting ends in: {betEndCountdown}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
