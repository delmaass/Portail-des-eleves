import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GameService } from "./GameService";
import { PlayerList } from "./lobby/PlayerList";
import { Player } from "../../../models/games/pictionary";
import { Loading } from "../../utils/Loading";
import { UserContext } from "../../../services/authService";
import "./pictionary.css";

let gameService;

export const Pictionary = () => {
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [gameMessage, setGameMessage] = useState("");
    const user = useContext(UserContext);

    const onReady = () => {
        gameService.ready();
    };

    useEffect(() => {
        gameService = new GameService({});
        gameService.onReceiveStatusMessage().subscribe((message: string) => setGameMessage(message));
        gameService.getPlayerList().subscribe(players => setPlayers(players));

        return () => {
            gameService.disconnect();
            gameService = null;
        }
    }, []);

    const isReady = players && user ? players.filter(player => player.id == user.id)[0].isReady : false;

    return players && user ? (
        <Container className="border rounded-3 border-black p-5">
            <Container className="game-container">
                <Button
                    variant={isReady ? "info" : "primary"}
                    className="d-flex m-auto"
                    onClick={onReady}
                >
                    {isReady ? "En attente des autres joueurs..." : "Prêt !"}
                </Button>
                <p className="position-absolute">{gameMessage}</p>
            </Container>
            <PlayerList playerList={players}/>
        </Container>
    ) : (
        <Loading/>
    )
}