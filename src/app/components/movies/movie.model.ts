export interface Movie {
    id: string,
    name: string,
    tags: string[],
    sharedBy: string,
    votedUp: number,
    votedDown: number
}

export interface Voted {
    idMovie: string;
    voteStatus: string
}