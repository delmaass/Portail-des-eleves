import React from "react";
import { Link } from "react-router-dom";
import { Score as ScoreModel } from "../../models/games";
import { api } from "../../services/apiService";
import { Sidebar } from "../../utils/Sidebar";
import { Size } from "../../utils/size";
import { UserAvatar } from "../utils/avatar/UserAvatar";
import { Pagination } from "../utils/Pagination";

interface GameSidebarProps {
    gameId?: string;
}

const Leaderboard = ({gameId} : GameSidebarProps) => (
    <Sidebar title="Leaderboard">
        Work in progress...
    </Sidebar>
);

const Score = ({user, game, score, when, ...props}: ScoreModel) => (
    <li className="list-group-item list-group-item-action px-0 d-flex align-items-center" {...props}>
        <Link to={"/profils/" + user}><span className="icon mr-3">
            <UserAvatar
                userId={user}
                size={Size.Medium}
            />
        </span></Link>
        <div>
            <b>{user}</b>{game ? (<> à <Link to={"/games/" + game.id} className="text-black"><b>{game.name}</b></Link></>) : ""}
            <br/>
            Score : <b>{score}</b>
        </div>
    </li>
);

const Scores = ({gameId} : GameSidebarProps) => (
    <Sidebar title="Derniers scores">
        <Pagination
            apiKey={["api.scores.list", {game: gameId}]}
            apiMethod={api.scores.list}
            render={(scores, paginationControl) => (
                <>
                {console.log(scores)}
                {scores.map((score, idx) => (
                    <Score key={idx} user={score.user} game={gameId ? "" : score.game} score={score.score} when={score.when} /> 
                ))
                }
                {paginationControl}
                </>
            )}
        />
    </Sidebar>
);

export const GameSidebar = ({gameId} : GameSidebarProps) => (
    <>
        <Leaderboard gameId={gameId}/>
        <Scores gameId={gameId}/>
    </>
); 