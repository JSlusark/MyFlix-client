import { React, useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row } from "react-bootstrap";

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
			<Row>
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
			</Row>
		)
	);
};
