import React from "react";

export const Counter = ({time}) => {
    return (
        <div>
            Il reste <b>{ ""+time }</b> secondes.
        </div>
    )
}