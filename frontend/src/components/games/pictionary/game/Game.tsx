import React from "react";
import { Container } from "react-bootstrap";
import { PaperService, SocketService } from "../services/services";
import { Canvas } from "./Canvas";
import { Loading } from "../../../utils/Loading"
import { Answer } from "./Answer";
import { Counter } from "./Counter";

interface GameProps {
    paperService: PaperService;
    answer?: string;
    timeLeft?: number;
    isDrawer?: boolean
}

// let paperService;

export const Game = ({answer, timeLeft, isDrawer, paperService}: GameProps) => (
    <Container>
        {answer ? (<Answer answer={answer} />) : ""}
        {timeLeft ? (<Counter time={timeLeft} />) : ""}
        <Canvas isDrawer={isDrawer} paperService={paperService}/>
        {/* <Chat /> */}
    </Container>
)