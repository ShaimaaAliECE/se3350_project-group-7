import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { Box } from "@chakra-ui/react";

export type TimerProps = {};

const Timer:React.FC<TimerProps> = ({ ...rest }) => {
    
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const game = useGame();

    const tick = () => {
        setSecondsElapsed(secondsElapsed + 1);
    };

    function getTime() {
        let totalSeconds = secondsElapsed;
        let hrs = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;

        return (
            `${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
    }

    function reset() {
        setSecondsElapsed(0);
    }

    useEffect(() => {
        reset();
    }, [game.level]);

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    }, [secondsElapsed]);

    return (
        <Box { ...rest }>
            {getTime()}
        </Box>
    );
}

export default Timer;