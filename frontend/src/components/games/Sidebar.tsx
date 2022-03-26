import React from "react";

interface LeaderboardSidebarProps {
    gameId?: string;
}

export const LeaderboardSidebar = ({gameId} : LeaderboardSidebarProps) => (
    <div>Leaderboard{ gameId ? " " + gameId : "" }</div>
)