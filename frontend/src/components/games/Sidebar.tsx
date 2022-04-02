import React from "react";
import { Link } from "react-router-dom";
import { ShortGame } from "../../models/games";
import { api } from "../../services/apiService";
import { Sidebar } from "../../utils/Sidebar";
import { Size } from "../../utils/size";
import { UserAvatar } from "../utils/avatar/UserAvatar";
import { Pagination } from "../utils/Pagination";
import dayjs from "dayjs";
import "dayjs/locale/fr";

interface GameSidebarProps {
  gameId?: string;
}

interface ScoreProps {
  user: string;
  score: number;
  game?: ShortGame;
  when?: Date;
}

const Leaderboard = ({ gameId }: GameSidebarProps) => (
  <Sidebar title="Leaderboard">
    <Pagination
      apiKey={["api.scores.leaderboard", { game: gameId }]}
      apiMethod={api.scores.leaderboard}
      render={(scores, paginationControl) => (
        <>
          {scores.map((score, idx) => (
            <Score key={idx} user={score.user} score={score.totalScore} />
          ))}
          {paginationControl}
        </>
      )}
    />
  </Sidebar>
);

const Score = ({ user, score, game, when, ...props }: ScoreProps) => (
  <li
    className="list-group-item list-group-item-action px-0 d-flex flex-column"
    {...props}
  >
    {when ? (
      <time className="pb-1">
        Le <b>{dayjs(when).locale("fr").format("dddd DD MMMM")}</b> à{" "}
        <b>{dayjs(when).locale("fr").format("HH:mm:ss")}</b>
      </time>
    ) : (
      ""
    )}
    <div className="d-flex align-items-center">
      <Link to={"/profils/" + user}>
        <span className="icon mr-3">
          <UserAvatar userId={user} size={Size.Medium} />
        </span>
      </Link>
      <div>
        <b>{user}</b>
        {game ? (
          <>
            {" "}
            à{" "}
            <Link to={"/games/" + game.id} className="text-black">
              <b>{game.name}</b>
            </Link>
          </>
        ) : (
          ""
        )}
        <br />
        Score : <b>{score}</b>
      </div>
    </div>
  </li>
);

const Scores = ({ gameId }: GameSidebarProps) => (
  <Sidebar title="Derniers scores">
    <Pagination
      apiKey={["api.scores.list", { game: gameId }]}
      apiMethod={api.scores.list}
      render={(scores, paginationControl) => (
        <>
          {scores.map((score, idx) => (
            <Score
              key={idx}
              user={score.user}
              game={gameId ? "" : score.game}
              score={score.score}
              when={score.when}
            />
          ))}
          {paginationControl}
        </>
      )}
    />
  </Sidebar>
);

export const GameSidebar = ({ gameId }: GameSidebarProps) => (
  <>
    <Leaderboard gameId={gameId} />
    <Scores gameId={gameId} />
  </>
);
