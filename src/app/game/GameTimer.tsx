"use client";

import { Flex } from "antd";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Game.module.css";

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

  const getNext20Seconds = () => {
    const currentTime = new Date();
    const next20Seconds = new Date(currentTime.getTime() + 30000);
    return next20Seconds;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const next30Seconds = getNext20Seconds();
      restart(next30Seconds, true); // Restart the timer with the new expiryTimestamp and autoStart
    }, 30000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [Timer]);

  return (
    <Flex vertical gap={14} align="center">
      <Flex align="center" justify="center" className={styles.GameTimer}>
        {minutes > 0 && <span>{minutes}</span>}
        {seconds > 0 && <span>{seconds}</span>}{" "}
      </Flex>
      <Flex>Flop Timer:</Flex>
    </Flex>
  );
};

export default GameTimer;
