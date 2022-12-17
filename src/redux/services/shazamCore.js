import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam-core.p.rapidapi.com',
		prepareHeaders: (headers) => {
			headers.set(
				'X-RapidAPI-Key',
				'a86e2d1716msh47f5380eb0b2403p11dfe9jsnc976d49121c1'
			);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => '/v1/charts/world' }),
		getSongDetails: builder.query({
			query: ({ songid }) => `/v1/tracks/details?track_id=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/v1/tracks/related?track_id=${songid}`,
		}),
		getArtistDetails: builder.query({
			query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
	useGetArtistDetailsQuery,
} = shazamCoreApi;
