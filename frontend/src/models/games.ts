export interface Game {
  id: string;
  name: string;
  mode: "S" | "M";
  description: string;
  pub_date: Date;
}

export interface ShortGame {
  id: string;
  name: string;
}

export interface Score {
  user: string;
  game: ShortGame;
  score: number;
  when: Date;
}
