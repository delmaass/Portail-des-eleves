import { Game, Leaderboard, Score } from "../../models/games";
import { toUrlParams } from "../../utils/urlParam";
import { apiService, PaginatedResponse, unwrap } from "../apiService";

export const games = {
  list: () => unwrap<PaginatedResponse<Game[]>>(apiService.get(`/games/game/`)),
  get: (gameId) => unwrap<Game>(apiService.get(`/games/game/${gameId}/`)),
};

export const scores = {
  list: (params) =>
    unwrap<PaginatedResponse<Score[]>>(
      apiService.get(`/games/scores/${toUrlParams({ ...params })}`)
    ),
  leaderboard: (params) =>
    unwrap<PaginatedResponse<Leaderboard[]>>(
      apiService.get(`/games/scores/leaderboard/${toUrlParams({ ...params })}`)
    ),
};
