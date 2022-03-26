import React from "react";
import { Button, Container } from "react-bootstrap";
import { PlayerList } from "./lobby/PlayerList";

const PICTIONARY_SERVER_URL = "http://localhost:3001/";
const playerList = [
    {
        id: "20delmas",
        ready: false
    },
    {
        id: "17bocquet",
        ready: true
    }
]

export const Pictionary = () => (
    <Container>
        <Button variant="primary">
            Prêt !
        </Button>
        <PlayerList playerList={playerList}/>
    </Container>
)