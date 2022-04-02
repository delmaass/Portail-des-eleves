import { GameLayout } from "../components/games/Game";
import { GamesList } from "../components/games/List";
import { Route } from "./global";

export type GamesRoute = Route & {
  props?: object;
  defaultLayout: boolean;
};

export const routes: GamesRoute[] = [
  {
    path: ``,
    component: GamesList,
    exact: true,
    defaultLayout: true,
  },
  {
    path: `/:gameId/`,
    component: GameLayout,
    exact: true,
    defaultLayout: true,
  },
];
