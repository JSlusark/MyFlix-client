//Change the name in MovieList
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { MainView } from "../main-view/main-view";
import { Button, Card, Col } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import { AddFavorite } from "../add-favorite/add-favorite";

export const MovieCard = ({
	movieData,
	user,
	token,
	favoriteList,
	onChangeFavorites,
}) => {
	const [isFavorite, setIsFavorite] = useState();

	return (
		<Col
			key={movieData.id}
			md={3}
			className="p-3"
		>
			<Card className="h-100 ">
				<AddFavorite
					user={user}
					movieData={movieData}
					token={token}
					favoriteList={favoriteList}
					onColorChange={(color) => setIsFavorite(color)}
					isFavorite={isFavorite}
				/>
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
