//Change in MovieDetails
import React from "react";
import PropTypes from "prop-types";
import { Container, Button, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// import { FaThumbsUp } from "react-icons/fa";

export const MovieView = ({ movies, user, movieData, token }) => {
	const { movieId } = useParams();
	const movie = movies.find((b) => b.id === movieId);

	return (
		<Col
			md={8}
			className="mt-5 mb-5"
		>
			<Container>
				<div
					className="moviesheet rounded"
					style={{ background: "#242846", color: "#eaebf2" }}
				>
					<div className="buttons">
						{/* Add a margin and a padding.
					Display in columns
					Back should be left and add fave right (or see if you can overlay on image)
					*/}
						<Link to={`/`}>
							<Button
								variant="danger"
								// className="mt-3"
								style={{ width: "20%" }}
							>
								Back
							</Button>
						</Link>
					</div>

					<div>
						<img
							src={movie.image}
							alt="movie image"
							className="w-50 d-block mx-auto p-3"
						/>
					</div>
					<div className="movietext p-3">
						<div>
							<span className="bold">Title: </span>
							<span>{movie.title}</span>
						</div>
						<div>
							<span className="bold">Description: </span>
							<span>{movie.description}</span>
						</div>
						<div>
							<span className="bold">Genre: </span>
							<span>{movie.genre}</span>
						</div>
						<div>
							<span className="bold">Director: </span>
							<span>{movie.director}</span>
						</div>
					</div>
				</div>
			</Container>
		</Col>
	);
};
