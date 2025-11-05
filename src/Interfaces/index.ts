export interface IProduct {
    total_results: number;
    total_pages: number;
    title: string;
    page: number;
    release_date?: string;
    poster_path?: string | null;
    overview?: string;
    rating?: number;
    id: number;
    imdb_id?: number;
    name: string
    vote_average: number;
    media_type: string;
    first_air_date?: string;
    homepage: string;

}

export interface ILogin {
    identifier: string,
    password: string
}
export interface IRegister {
    email: string;
    username: string;
    password: string;
}

export interface IUser {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface IImdbData {
    id: number;
    imdb_id: string | null;
    freebase_mid: string | null;
    freebase_id: string | null;
    tvdb_id: number | null;
    tvrage_id: number | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    wikidata_id: string | null;
}
export interface IMovieCredits {
    character: string;   //character name
    original_name: string;  //realname
    profile_path: string; //soort el actor
}
