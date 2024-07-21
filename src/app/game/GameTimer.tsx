"use client";

import { Flex } from "antd";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Game.module.scss";

const GameTimer = ({ Timer }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: Timer,
    autoStart: true,
  });

  const getNext30Seconds = () => {
    const currentTime = new Date();
    const next30Seconds = new Date(currentTime.getTime() + 30000);
    return next30Seconds;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const next30Seconds = getNext30Seconds();
      restart(next30Seconds, true); // Restart the timer with the new expiryTimestamp and autoStart
    }, 30000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [Timer]);

  return (
    <Flex align="center" justify="center" className={styles.GameTimer}>
      {minutes > 0 && <span>{minutes}</span>}
      {seconds > 0 && <span>{seconds}</span>}{" "}
    </Flex>
  );
};

export default GameTimer;
