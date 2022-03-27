import React from "react";
import { Player as PlayerModel } from "../../../../models/games/pictionary";
import { Size } from "../../../../utils/size";
import { Avatar } from "../../../utils/avatar/Avatar";

const Player = ({player}: {player: PlayerModel}) => (
    <li className="d-flex align-items-center col">
        <Avatar url={"/profile/" + player.id} size={Size.XXL} className="mr-4"/>
        <div>
            <h3 className="mb-1">{player.name}</h3>
            {player.isReady ? (
                <span className="text-success">Prêt !</span>
            ) : (
                <span className="text-danger">En attente...</span>
            )}
        </div>
    </li>
)

export const PlayerList = ({playerList}: {playerList: PlayerModel[]}) => (
    <div>
        <h2>Joueurs présents</h2>
        <ul className="m-0 p-0 row row-cols-auto">
            {playerList.map((player, idx) => (
                <Player key={idx} player={player}/>
            ))}
        </ul>
    </div>
)