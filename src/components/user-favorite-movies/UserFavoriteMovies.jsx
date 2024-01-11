import { React, useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const UserFavoriteMovies = ({ user, movies, favoriteMovies }) => {
	return (
		useEffect(() => {
			console.log("mounted");
		}, [favoriteMovies]),
		(
			<div>
				{favoriteMovies.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							user={user}
							movieData={movie}
							favoriteMovies={favoriteMovies}
						/>
					);
				})}
			</div>
		)
	);
};
