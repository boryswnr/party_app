export const defaultSong = {
    artist: "Artist name",
    duration: 289773,
    id: "",
    image_url:
        "https://i.picsum.photos/id/117/1544/1024.jpg?hmac=xFWtVUv1xkFVVidifC3drKerU_k_za4w28fv5etvxRc",
    is_playing: false,
    time: 0,
    title: "Song name",
    votes: 0,
    votes_required: 2,
};

export type defaultSongType = {
    artist: string;
    duration: number;
    id: string;
    image_url?: string;
    is_playing: boolean;
    time: number;
    title: string;
    votes: number;
    votes_required: number;
};
