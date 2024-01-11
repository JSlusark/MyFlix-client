import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { on } from "process";

export const AddFavorite = ({
	user,
	movieData,
	token,
	favoriteList,
	onColorChange,
	isFavorite,
}) => {
	console.log(movieData);
	consol;

	const handleToggleFavorite = () => {
		if (user.favoriteMovies.includes(movieData.id)) {
			console.log("it's there, then deleted");

			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						localStorage.setItem("user", JSON.stringify(data));
					} else {
						alert("Failed to remove to favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		} else {
			console.log("it's not there, then added");

			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "POST", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						localStorage.setItem("user", JSON.stringify(data));
					} else {
						alert("Failed to add to favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		}
	};

	return (
		<div
			onClick={handleToggleFavorite}
			// disabled={!token}
			style={{
				position: "absolute",
				top: "5px",
				left: "5px",
			}}
		>
			<Button
				variant="primary"
				onClick={() => {}}
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
