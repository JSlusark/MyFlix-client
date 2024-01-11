import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const AddFavorite = ({
	user,
	movieData,
	movies,
	token,
	favoriteMovies,
}) => {
	var color = "secondary";
	console.log(favoriteMovies);

	favoriteMovies.map((movie) => {
		if (movie.id === movieData.id) {
			color = "danger";
		}
	});

	return (
		<div
			style={{
				position: "absolute",
				top: "5px",
				left: "5px",
			}}
		>
			<Button
				variant={color}
				// onClick={toggleFavorite}
			>
				<MdOutlineFavoriteBorder />
			</Button>
		</div>
	);
};

AddFavorite.propTypes = {
	user: PropTypes.object.isRequired,
	movieData: PropTypes.object.isRequired,
	token: PropTypes.string,
};
