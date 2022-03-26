import React from "react";
import { Size } from "../../../../utils/size";
import { Avatar } from "../../../utils/avatar/Avatar";

interface PlayerProps {
    id: string;
    ready: boolean;
    number: number;
}

const Player = ({id, ready, number}: PlayerProps) => (
    <li className="d-flex align-items-center col">
        <Avatar url={"/profile/" + id} size={Size.XXL} className="mr-4"/>
        <div>
            <h3 className="mb-1">{id}</h3>
            {ready ? (
                <span className="text-success">Prêt !</span>
            ) : (
                <span className="text-danger">En attente...</span>
            )}
        </div>
    </li>
)

export const PlayerList = ({playerList}) => (
    <div>
        <h2>Joueurs présents</h2>
        <ul className="m-0 p-0 row row-cols-auto">
            {playerList.map((player, idx) => (
                <Player key={idx} id={player.id} ready={player.ready} number={idx+1}/>
            ))}
        </ul>
    </div>
)