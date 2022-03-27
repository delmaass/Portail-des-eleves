import React from "react";

export const Answer = ({answer, end}) => (
    <div>
        Le mot {end ? "était" : "est"} : <b>{""+answer}</b>
    </div>
)