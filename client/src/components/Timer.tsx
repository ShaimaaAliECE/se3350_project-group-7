import React, { useEffect, useState, useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { Box, BoxProps } from "@chakra-ui/react";

export type TimerProps = {} & BoxProps;

const Timer: React.FC<BoxProps> = ({ ...rest }) => {
  const game = useGame();

  const time = useMemo(() => {
    let totalSeconds = game.secondsElapsed;
    let hrs = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [game.secondsElapsed]);

  return <Box {...rest}>{time}</Box>;
};

export default Timer;
