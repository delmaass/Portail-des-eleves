import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GameService } from "./GameService";
import { PlayerList } from "./lobby/PlayerList";
import { Player } from "../../../models/games/pictionary";
import { Loading } from "../../utils/Loading";

export const Pictionary = () => {
    const gameService = new GameService({});
    const [player, setPlayer] = useState<Player>();
    const [players, setPlayers] = useState();
    const [gameMessage, setGameMessage] = useState("");
    
    const onReady = () => {
        gameService.ready();
    }

    useEffect(() => {
        gameService.getPlayerList().subscribe(players => setPlayers(players));
        gameService.getPlayer().subscribe(player => setPlayer(player));
        gameService.onReceiveStatusMessage().subscribe((message: string) => setGameMessage(message));
    }, [])

    return player ? (
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
    ) : (
        <Loading/>
    )
}