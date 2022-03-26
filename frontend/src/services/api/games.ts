import { Game } from "../../models/games";
import { apiService, PaginatedResponse, unwrap } from "../apiService";

export const games = {
  list: () => unwrap<PaginatedResponse<Game[]>>(apiService.get(`/games/game/`)),
  get: (gameId) => unwrap<Game>(apiService.get(`/games/game/${gameId}/`)),
};
