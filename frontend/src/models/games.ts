export interface Game {
  id: string;
  name: string;
  mode: "S" | "M";
  description: string;
  pub_date: Date;
}

export interface Score {
  userId: string;
  gameId: string;
  gameName: string;
  score: number;
  when: Date;
}
