import { React, useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const UserFavoriteMovies = ({
	user,
	favoriteMovies,
	setFavoriteMovies,
	movies,
	token,
}) => {
	console.log(favoriteMovies);
	console.log(movies);

	return (
		useEffect(() => {
			console.log("mounted");
		}, [favoriteMovies]),
		console.log(favoriteMovies),
		console.log(setFavoriteMovies),
		(
			<div>
				{favoriteMovies.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							user={user}
							movieData={movie}
							setFavoriteMovies={setFavoriteMovies}
							favoriteMovies={favoriteMovies}
							token={token}
						/>
					);
				})}
			</div>
		)
	);
};
