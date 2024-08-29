"use client";

import { Flex } from "antd";
import { useEffect, useState } from "react";
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
  const [updateTime, setUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Timer Update");
    setUpdateTime(new Date());
    restart(timerExpiryDateTime, true); // Restart the timer with the new expiryTimestamp and autoStart
  }, [timerExpiryDateTime.getTime()]);

  return (
    <Flex align="center" justify="center" className={styles.GameTimer}>
      {totalSeconds > 0 ? (
        <span>
          {timerMessage}
          {totalSeconds} seconds
        </span>
      ) : (
        <span>{timerMessage}</span>
      )}{" "}
    </Flex>
  );
};

export default GameTimer;
