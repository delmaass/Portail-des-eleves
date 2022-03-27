import React, { useState } from "react";
import { useEffect } from "react";
import { Loading } from "../../utils/Loading";
import { Game } from "./game/Game";
import { GameService } from "./services/GameService";
import { Lobby } from "./lobby/Lobby";
import { SocketService } from "./services/SocketService";
import { PaperService } from "./services/PaperService";
import { ChatService } from "./services/services";
import { Answer } from "./game/Answer";

let socketService;
let gameService;
let paperService;
let chatService;

export const Pictionary = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [answer, setAnswer] = useState("");
    const [time, setTime] = useState(0);
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        socketService = new SocketService({});
        gameService = new GameService(socketService);
        paperService = new PaperService(socketService);
        chatService = new ChatService(socketService);

        gameService.isPlaying().subscribe((play: boolean) => setIsPlaying(play));
        gameService.onGameStart().subscribe(() => setIsPlaying(true));
        gameService.onGameEnd().subscribe((answer) => {
            setIsPlaying(false);
            setAnswer(answer);
            setTime(0);
            setDrawer(false);
        })

        gameService.onReceiveAnswer().subscribe((answer) => setAnswer(answer));
        gameService.timeLeft().subscribe((time) => setTime(time));

        paperService.isDrawer().subscribe(() => setDrawer(true));

        return () => {
            socketService.disconnect();
            socketService = null;
            gameService = null;
            paperService = null;
            chatService = null;
            setAnswer("");
            setTime(0);
            setDrawer(false);
        }
    }, [])
    
    return gameService ? (
        isPlaying ? (
            <Game answer={answer} timeLeft={time} isDrawer={drawer} paperService={paperService} chatService={chatService} />
        ) : (
            <>
                {answer ? <Answer answer={answer} end={true}/> : ''}
                <Lobby gameService={gameService}/>
            </>
        )
    ) : (
        <Loading/>
    );
}