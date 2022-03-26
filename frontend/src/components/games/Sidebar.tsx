import React from "react";
import { Score as ScoreModel } from "../../models/games";
import { api, useBetterPaginatedQuery } from "../../services/apiService";
import { Sidebar } from "../../utils/Sidebar";
import { Size } from "../../utils/size";
import { UserAvatar } from "../utils/avatar/UserAvatar";
import { ErrorPage } from "../utils/ErrorPage";
import { Loading } from "../utils/Loading";
import { Pagination } from "../utils/Pagination";

interface GameSidebarProps {
    gameId?: string;
}

const Leaderboard = ({gameId} : GameSidebarProps) => (
    <Sidebar title="Leaderboard">
        Work in progress...
    </Sidebar>
)
const Score = ({user, game, score, when, ...props}: ScoreModel) => (
    <li className="list-group-item list-group-item-action px-0 d-flex align-items-center" {...props}>
        <span className="icon mr-3">
            <UserAvatar
                userId={user}
                size={Size.Medium}
            />
        </span>
        <div>
            <b>{user}</b> à <b>{game.name}</b>
            <br/>
            Score : <b>{score}</b>
        </div>
    </li>
)

const Scores = ({gameId} : GameSidebarProps) => (
    <Sidebar title="Derniers scores">
        <Pagination
            apiKey={["api.scores.list"]}
            apiMethod={api.scores.list}
            render={(scores, paginationControl) => (
                <>
                {console.log(scores)}
                {scores.map((score, idx) => (
                    <Score key={idx} user={score.user} game={score.game} score={score.score} when={score.when} /> 
                ))
                }
                {paginationControl}
                </>
            )}
        />
    </Sidebar>
)

export const GameSidebar = ({gameId} : GameSidebarProps) => (
    <>
        <Leaderboard/>
        <Scores/>
    </>
); 