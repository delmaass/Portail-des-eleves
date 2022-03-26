import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GameService } from "./GameService";
import { PlayerList } from "./lobby/PlayerList";

const initialPlayer = {
    id: "20delmas",
    name: "20delmas",
    isReady: false,
    score: 0
}

const playerList = [
    initialPlayer,
    {
        id: "17bocquet",
        ready: true
    }
];

export const Pictionary = () => {
    const gameService = new GameService(initialPlayer);
    const [player, setPlayer] = useState(initialPlayer);
    const [players, setPlayers] = useState(playerList);
    const [gameMessage, setGameMessage] = useState("");

    const setUsername = (name) => {
        gameService.setUsername(name);
        setPlayer({
            ...player,
            name: name
        });
    } 
    
    const onReady = () => {
        gameService.ready();
        setPlayer({
            ...player,
            isReady: true
        })
    }

    useEffect(() => {
        gameService.getPlayerList().subscribe(players => setPlayers(players));
        gameService.onReceiveStatusMessage().subscribe((message: string) => setGameMessage(message));
    })

    return (
        <Container className="border rounded-3 border-black p-5">
            <Button
                variant={player.isReady ? "info" : "primary"}
                className="d-flex mx-auto my-8"
                onClick={onReady}
            >
                {player.isReady ? "En attente des autres joueurs..." : "Prêt !"}
            </Button>
            <PlayerList playerList={players}/>
        </Container>
    )
}