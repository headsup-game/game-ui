"use client";

import { Flex } from "antd";
import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Game.module.scss";
import { isEqual } from "lodash";

interface GameTimerProps {
  timer: Date;
  timerMessage: string;
}

const isGameTimerEqual = (prevProps: GameTimerProps, nextProps: GameTimerProps): boolean => {
  return isEqual(prevProps.timer, nextProps.timer) && prevProps.timerMessage === nextProps.timerMessage;
}

const GameTimer: React.FC<GameTimerProps> = React.memo(({
  timer: timerExpiryDateTime,
  timerMessage: timerMessage,
}) => {
  const { totalSeconds, restart } = useTimer({
    expiryTimestamp: timerExpiryDateTime,
    autoStart: true,
  });

  useEffect(() => {
    restart(timerExpiryDateTime, true); // Restart the timer with the new expiryTimestamp and autoStart
  }, [timerExpiryDateTime.getTime(), timerMessage]);

  return (
    <div className="max-w-full justify-center items-center flex-wrap text-xl mt-4">
      <span>
        {timerMessage}
      </span>
      {totalSeconds > 0 && <span className="font-extrabold">{'...'}{totalSeconds} seconds</span>}
    </div>
  );
}, (prevProps, nextProps) => isGameTimerEqual(prevProps, nextProps));

GameTimer.displayName = "GameTimer";

export default GameTimer;
