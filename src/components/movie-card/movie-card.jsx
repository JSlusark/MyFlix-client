//Change the name in MovieList
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import { AddFavorite } from "../add-favorite/add-favorite";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const MovieCard = ({
	movieData,
	movies,
	token,
	user,
	favoriteMovies,
	setFavoriteMovies,
}) => {
	const [color, setColor] = useState(false);
	const isFavorite = favoriteMovies.includes(movieData);

	useEffect(() => {
		setColor(isFavorite);
		console.log("effect activated");
	}, [favoriteMovies]);

	const toggleFavorite = () => {
		if (isFavorite) {
			console.log("already favorited");
			console.log(movieData);

			const updatedFavorites = favoriteMovies.filter(
				(favMovie) => favMovie !== movieData
			);
			setFavoriteMovies(updatedFavorites);
			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data) {
						localStorage.setItem("user", JSON.stringify(data));
						//location.reload();
					} else {
						alert("Failed to remove to favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
			//I want to be chnag
		} else {
			console.log("not favorited");
			console.log(movieData);
			setFavoriteMovies([...favoriteMovies, movieData]);
			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "POST", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data) {
						localStorage.setItem("user", JSON.stringify(data));
						//location.reload();
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
		<Col
			key={movieData.id}
			md={3}
			className="p-3"
		>
			<Card className="h-100 ">
				<div
					style={{
						position: "absolute",
						top: "5px",
						left: "5px",
					}}
				>
					<Button
						variant={color ? "danger" : "secondary"}
						onClick={toggleFavorite}
					>
						<MdOutlineFavoriteBorder />
					</Button>
				</div>
				<Card.Img
					variant="top"
					src={movieData.image}
				/>
				<Card.Body>
					<Card.Title>{movieData.title}</Card.Title>
					<Card.Text>{movieData.director}</Card.Text>
				</Card.Body>
				<Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
					<Button
						variant="primary"
						style={{ width: "100%" }}
						className="rounded-0 rounded-bottom"
					>
						Open
					</Button>
				</Link>
			</Card>
		</Col>
	);
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
	movieData: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		genre: PropTypes.string.isRequired,
		director: PropTypes.string.isRequired,
	}).isRequired,
};
