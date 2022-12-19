import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
	const [country, setCountry] = useState('');
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByCountryQuery(country);

	const options = {
		method: 'GET',
		url: 'https://geo.ipify.org/api/v2/country',
		params: {
			apiKey: 'at_x9r8iAxXiQyHUbBPBJvaGKEN31Bl3',
			ipAddress: '8.8.8.8',
		},
	};

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			'https://geo.ipify.org/api/v2/country?apiKey=at_x9r8iAxXiQyHUbBPBJvaGKEN31Bl3&ipAddress=8.8.8.8'
	// 		)
	// 		.then((res) => console.log(res.json()))
	// 		.catch((err) => console.log(err))
	// 		.finally(() => setLoading(false));
	// }, [country]);

	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	if (isFetching && loading)
		return <Loader title="Loading Songs around you..." />;

	if (error && country !== '') return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
				Around you <span className="font-black">{country}</span>
			</h2>

			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default CountryTracks;
