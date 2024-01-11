import { React, useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const UserFavoriteMovies = ({ user, movies, token, favoriteList }) => {
	const [teststate, setTestState] = useState("test state");

	useEffect(() => {
		console.log(favoriteList);
	}, [favoriteList]);

	const fave = movies.filter((movie) => user.favoriteMovies.includes(movie.id));

	return (
		<div>
			<h1 style={{ color: "white" }}>{teststate}</h1>
			{fave.map((movie) => {
				return (
					<MovieCard
						id={movie.id}
						user={user}
						movieData={movie}
						favoriteList={favoriteList}
						token={token}
					/>
				);
			})}
		</div>
	);
};
