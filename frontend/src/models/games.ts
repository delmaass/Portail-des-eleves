export interface Game {
    id: string;
    name: string;
    mode: "S" | "M";
    description: string;
    pub_date: Date;
}