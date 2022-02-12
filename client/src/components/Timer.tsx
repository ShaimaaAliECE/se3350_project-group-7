import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";

export default function Timer() {
    
    const { hours, minutes, seconds} = {hours: 0, minutes: 0, seconds: 0};
    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
    const game = useGame();

    const tick = () => {
        if (mins === 59 && secs === 59) {
            setTime([hrs + 1, 0, 0]);
        } else if (mins !== 59 && secs === 59) {
            setTime([hrs, mins + 1, 0]);
        } else {
            setTime([hrs, mins, secs + 1]);
        }
    };

    function reset() {
        setTime([0, 0, 0]);
    }

    useEffect(() => {
        reset();
    }, [game.level]);

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div>
            {`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
        </div>
    );
}