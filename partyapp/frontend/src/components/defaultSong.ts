export const defaultSong = {
    artist: "Artist name",
    duration: 289773,
    id: "",
    image_url: "https://picsum.photos/id/410/400/400",
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
