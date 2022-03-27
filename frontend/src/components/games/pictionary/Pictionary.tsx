import React, { useState } from "react";
import { useEffect } from "react";
import { Loading } from "../../utils/Loading";
import { Game } from "./game/Game";
import { GameService } from "./services/GameService";
import { Lobby } from "./lobby/Lobby";
import { SocketService } from "./services/SocketService";
import { PaperService } from "./services/PaperService";

let socketService;
let gameService;
let paperService;

export const Pictionary = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [answer, setAnswer] = useState("");
    const [time, setTime] = useState(0);
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        socketService = new SocketService({});
        gameService = new GameService(socketService);
        paperService = new PaperService(socketService);

        gameService.isPlaying().subscribe((play: boolean) => setIsPlaying(play));
        gameService.onGameStart().subscribe(() => setIsPlaying(true));

        gameService.onReceiveAnswer().subscribe((answer) => setAnswer(answer));
        gameService.timeLeft().subscribe((time) => setTime(time));

        paperService.isDrawer().subscribe(() => setDrawer(true));

        return () => {
            socketService.disconnect();
            socketService = null;
            gameService = null;
            paperService = null;
        }
    }, [])
    
    return gameService ? (
        isPlaying ? (
            <Game answer={answer} timeLeft={time} isDrawer={drawer} paperService={paperService} />
        ) : (
            <Lobby gameService={gameService}/>
        )
    ) : (
        <Loading/>
    );
}