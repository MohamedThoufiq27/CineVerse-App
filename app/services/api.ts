import axios from "axios";

const OMDB_API_URL = 'https://www.omdbapi.com/';
const OMDB_API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;

const BASE_URL_TRAKT = 'https://api.trakt.tv';
const API_KEY_TRAKT = process.env.EXPO_PUBLIC_TRAKT_API_KEY;

// API headers
const API_OPTIONS_TRAKT = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': `2`,
        'trakt-api-key': API_KEY_TRAKT
    }
};


export const fetchMovies = async ({query}:{query:string}) => {
        try {
            const endpoint = query
                ? `${BASE_URL_TRAKT}/search/movie?query=${encodeURIComponent(query)}&extended=images,full`
                : `${BASE_URL_TRAKT}/movies/trending?page=1&limit=15&extended=images,full`;

            const response = await axios(endpoint, API_OPTIONS_TRAKT);
            const data = response.data;
            // console.log(data);
            return data;
        } catch (error) {
            console.log(`error fetching the data ${error}`);
            return error;
        }
}

export const fetchMovieDetails = async (id:string) => {
    try{
        const res = await axios.get(OMDB_API_URL,{params:{i:id,apikey:OMDB_API_KEY}});
        const data = res.data;
        // console.log(id);
        return data;
    }catch(err){
        console.log(err);
    }
}