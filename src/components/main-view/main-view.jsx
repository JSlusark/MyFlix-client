import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../NavBar/NavBar";
import { ProfileView } from "../profile-view/profile-view";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserFavoriteMovies } from "../user-favorite-movies/UserFavoriteMovies";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");

	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch("https://shrouded-ocean-05047.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((doc) => {
					return {
						id: doc._id,
						title: doc.title,
						image: doc.imageurl,
						description: doc.description,
						genre: doc.genre.name,
						director: doc.director.name,
					};
				});
				setMovies(moviesFromApi);
				setFavoriteMovies(
					moviesFromApi.filter((movie) =>
						user.favoriteMovies.includes(movie.id)
					)
				);
			})
			.catch((error) => {
				console.error("Error fetching movies:", error);
			});
	}, [token]);

	return (
		<BrowserRouter>
			<Row>
				<NavBar
					user={user}
					onLoggedOut={() => {
						setUser(null);
						setToken(null);
						localStorage.clear();
					}}
				/>
			</Row>

			<Row className=" m-2 mt-3">
				<Routes>
					{/* Signup Route */}
					<Route
						path="/signup"
						element={
							user ? (
								<Navigate
									to="/"
									movies={movies}
									user={user}
								/>
							) : (
								<SignupView />
							)
						}
					/>

					{/* Login Route */}
					<Route
						path="/login"
						element={
							user ? (
								<Navigate to="/" />
							) : (
								<LoginView
									onLoggedIn={(user, token) => {
										setUser(user);
										setToken(token);
									}}
								/>
							)
						}
					/>

					{/* ProfileView Route */}
					<Route
						path="/profileview"
						element={
							!user ? (
								<Navigate
									to="/login"
									replace
								/>
							) : (
								<div>
									<ProfileView
										user={user}
										movies={movies}
										favoriteMovies={favoriteMovies}
										setFavoriteMovies={setFavoriteMovies}
										token={token}
										onLoggedOut={() => {
											setUser(null);
											setToken(null);
											localStorage.clear();
										}}
									/>
								</div>
							)
						}
					/>

					{/* MovieView Route */}
					<Route
						path="/movies/:movieId"
						element={
							!user ? (
								<Navigate
									to="/login"
									replace
								/>
							) : movies.length === 0 ? (
								<col> The list is empty! </col>
							) : (
								//this is the movie details view (movie view) : selectedMovie ? (

								<MovieView
									movies={movies}
									user={user}
									token={token}
								/>
							)
						}
					/>

					{/*  Route homepage */}
					<Route
						path="/"
						element={
							!user ? (
								<Navigate
									to="/login"
									replace
								/>
							) : movies.length === 0 ? (
								<Col>The list is empty!</Col>
							) : (
								movies.map(
									(movie) => (
										console.log(movie),
										(
											<MovieCard
												key={movie.id}
												user={user}
												movieData={movie}
												setFavoriteMovies={setFavoriteMovies}
												favoriteMovies={favoriteMovies}
												token={token}
											/>
										)
									)
								)
							)
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
