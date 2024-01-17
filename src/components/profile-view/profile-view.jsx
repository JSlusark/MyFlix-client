import React, { useEffect, useState } from "react";
import { Col, Card, Container, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileUpdateView } from "../profile-update-view/profile-update-view";
import { UserFavoriteMovies } from "../user-favorite-movies/UserFavoriteMovies";

export const ProfileView = ({
	user,
	movies,
	token,
	favoriteMovies,
	setFavoriteMovies,
}) => {
	const handleDeleteAccount = () => {
		if (
			window.confirm(
				"This will permanently delete your account. Are you sure you want to delete?"
			)
		) {
			deleteAccount();
		}
	};

	const deleteAccount = () => {
		console.log("deleting");
		fetch(`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.ok) {
					alert("Your account has been deleted. Good Bye!");
					onLoggedOut();
				} else {
					alert("Could not delete account");
				}
			})
			.catch((e) => {
				alert(e);
			});
	};
	const handleProfileUpdate = () => {
		// Fetch user details again after profile update
		fetchUserDetails();
	};

	return (
		<div>
			<Row className="mt-3 ">
				<Col md={6}>
					<Card style={{ height: "100%" }}>
						<Card.Body>
							<Card.Title>User Profile</Card.Title>
							<p>User: {user.username}</p>
							<p>Email: {user.email}</p>
							<p>
								Birthday:{" "}
								{user.birthday.slice(0, 10).split("-").reverse().join("-")}
							</p>
							<Button
								variant="danger"
								onClick={handleDeleteAccount}
							>
								Delete user account
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col md={6}>
					<ProfileUpdateView
						user={user}
						token={token}
						onProfileUpdate={handleProfileUpdate}
					/>
				</Col>
			</Row>
			<Row>
				<Col
					md={12}
					style={{ width: "100%" }}
					className="mt-5"
				>
					<h2 className="text-white">Favourite Movies</h2>
				</Col>
			</Row>
			<Row>
				{favoriteMovies.length === 0 ? (
					<Col>
						<p style={{ color: "white" }}>Your favorite list is empty! </p>
						<Link to={`/`}>
							<Button
								variant="danger"
								className="mt-3 rounded"
								style={{ width: "30%" }}
							>
								Add movies
							</Button>
						</Link>
					</Col>
				) : (
					<UserFavoriteMovies
						user={user}
						movieData
						favoriteMovies={favoriteMovies}
						setFavoriteMovies={setFavoriteMovies}
						token={token}
					/>
				)}
			</Row>
		</div>
	);
};
