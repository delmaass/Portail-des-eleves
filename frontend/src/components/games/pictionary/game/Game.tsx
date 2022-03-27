import React from "react";
import { Container } from "react-bootstrap";
import { PaperService, ChatService } from "../services/services";
import { Canvas } from "./Canvas";
import { Answer } from "./Answer";
import { Counter } from "./Counter";
import { Chat } from "./Chat";

interface GameProps {
    paperService: PaperService;
    chatService: ChatService;
    answer?: string;
    timeLeft?: number;
    isDrawer?: boolean
}

// let paperService;

export const Game = ({answer, timeLeft, isDrawer, paperService, chatService}: GameProps) => (
    <Container className="border rounded-3 border-black p-5">
        {answer && isDrawer ? (<Answer answer={answer} end={false} />) : ""}
        {timeLeft ? (<Counter time={timeLeft} />) : ""}
        <Canvas isDrawer={isDrawer} paperService={paperService}/>
        <Chat chatService={chatService}/>
    </Container>
)