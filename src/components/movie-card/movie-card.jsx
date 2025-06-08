//Change the name in MovieList
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const MovieCard = ({
	movieData,
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
				`https://mymovielist-api-dhqp.onrender.com/users/${user.username}/movies/${movieData.id}`,
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
		} else {
			console.log("not favorited");
			console.log(movieData);
			setFavoriteMovies([...favoriteMovies, movieData]);
			fetch(
				`https://mymovielist-api-dhqp.onrender.com/users/${user.username}/movies/${movieData.id}`,
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
			xs={12}
			sm={6}
			md={4}
			lg={3}
			className="p-3"
		>
			<Card
				className=" h-100"
				key={movieData.id}
			>
				<Button
					variant={color ? "danger" : "secondary"}
					onClick={toggleFavorite}
					className="rounded-2 position-absolute m-2"
				>
					{color ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
				</Button>

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
						className="rounded-0 rounded-bottom w-100"
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
