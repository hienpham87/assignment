export interface Movie {
    id: number,
    name: string,
    tags: string[],
    price: number,
    sharedBy: string,
    votedUp: number,
    votedDown: number
}

export interface Voted {
    idMovie: number;
    voteStatus: string
}