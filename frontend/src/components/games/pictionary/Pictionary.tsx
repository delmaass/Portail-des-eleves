import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GameService } from "./GameService";
import { PlayerList } from "./lobby/PlayerList";
import { Player } from "../../../models/games/pictionary";
import { Loading } from "../../utils/Loading";
import "./pictionary.css";

export const Pictionary = () => {
    const gameService = new GameService({});
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [gameMessage, setGameMessage] = useState("");

    const onReady = () => {
        gameService.ready();
    };

    useEffect(() => {
        gameService.onReceiveStatusMessage().subscribe((message: string) => setGameMessage(message));
        gameService.getPlayerList().subscribe(players => setPlayers(players));
    }, [])

    return players && players[0] ? (
        <Container className="border rounded-3 border-black p-5">
            <Container className="game-container">
                <Button
                    variant={players[0].isReady ? "info" : "primary"}
                    className="d-flex m-auto"
                    onClick={onReady}
                >
                    {players[0].isReady ? "En attente des autres joueurs..." : "Prêt !"}
                </Button>
                <p className="position-absolute">{gameMessage}</p>
            </Container>
            <PlayerList playerList={players}/>
        </Container>
    ) : (
        <Loading/>
    )
}