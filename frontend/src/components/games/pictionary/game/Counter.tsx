import React, { useEffect, useState } from "react";

let interval;

export const Counter = ({time}) => {
    const [timeLeft, setTimeLeft] = useState(time);

    if(timeLeft <= 0) {
        clearInterval(interval);
    }

    useEffect(() => {
        interval = setInterval(() => setTimeLeft(timeLeft => timeLeft - 1), 1000)
    }, []);

    return timeLeft > 0 ? (
        <div>
            Il reste <b>{ ""+timeLeft }</b> secondes.
        </div>
    ) : <></>;
}