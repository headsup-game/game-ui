"use client";

import React from "react";
import { isEqual } from "lodash";

interface GameTimerProps {
  timer: number;
  timerMessage: string;
}

const isGameTimerEqual = (prevProps: GameTimerProps, nextProps: GameTimerProps): boolean => {
  return isEqual(prevProps.timer, nextProps.timer) && prevProps.timerMessage === nextProps.timerMessage;
}

const GameTimer: React.FC<GameTimerProps> = React.memo(({
  timer,
  timerMessage: timerMessage,
}) => {
  return (
    <div className="max-w-full justify-center items-center flex-wrap text-xl mt-4">
      <span>
        {timerMessage}
      </span>
      {timer > 0 && <span className="font-extrabold">{'...'}{Number(timer)} seconds</span>}
    </div>
  );
}, (prevProps, nextProps) => isGameTimerEqual(prevProps, nextProps));

GameTimer.displayName = "GameTimer";

export default GameTimer;
