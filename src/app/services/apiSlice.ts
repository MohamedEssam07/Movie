import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["movieDetails"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
    endpoints: (builder) => ({
        getMovieDetails: builder.query({
            query: (tempId) => {
                return {
                    url: `/movie/${tempId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                }
            }
        }),
        getTvDetails: builder.query({
            query: (tempId) => {
                return {
                    url: `/tv/${tempId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                }
            }
        }),
        getTvImdb: builder.query({
            query: (id) => {
                return {
                    url: `/tv/${id}/external_ids?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                }
            }
        }),
        getMovieImdb: builder.query({
            query: (id) => {
                return {
                    url: `/movie/${id}/external_ids?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                }
            }
        }),
        getMovieCredits: builder.query({
            query: (id) => {
                return {
                    url: `/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                }
            }
        }),
        getTvCredits: builder.query({
            query: (id) => {
                return {
                    url: `/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                }
            }
        })
    }),


})

export const { useGetMovieDetailsQuery, useGetTvDetailsQuery, useGetMovieImdbQuery, useGetTvImdbQuery, useGetMovieCreditsQuery, useGetTvCreditsQuery } = apiSlice

