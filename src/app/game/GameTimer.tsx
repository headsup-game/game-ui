"use client";

import { Flex } from "antd";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Game.module.scss";

const GameTimer = ({
  timer: timerExpiryDateTime,
  timerMessage: timerMessage,
}: {
  timer: Date;
  timerMessage: string;
}) => {
  const { totalSeconds, restart } = useTimer({
    expiryTimestamp: timerExpiryDateTime,
    autoStart: true,
  });

  useEffect(() => {
    console.log("timer restarts")
    restart(timerExpiryDateTime, true); // Restart the timer with the new expiryTimestamp and autoStart
  }, [timerExpiryDateTime.getTime(), timerMessage]);

  return (
    <Flex align="center" justify="center" className={styles.GameTimer}>
      <span>
        {timerMessage}
      </span>
      {totalSeconds > 0 && <span>{'...'}{totalSeconds} seconds</span>}
    </Flex >
  );
};

export default GameTimer;
