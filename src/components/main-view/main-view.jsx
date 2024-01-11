import { useState, useEffect } from "react";
import { AddFavorite } from "../add-favorite/add-favorite";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../NavBar/NavBar";
import { ProfileView } from "../profile-view/profile-view";
import { UserFavoriteMovies } from "../user-favorite-movies/UserFavoriteMovies";
import "./main-view.scss";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Route } from "react-router";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserFavoriteMovies } from "../user-favorite-movies/UserFavoriteMovies";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const storedFavoriteList = localStorage.getItem("favoriteList");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [favoriteList, setFavoriteList] = useState(
		storedFavoriteList ? storedUser.favoriteMovies : null
	);

	// console.log("favemovielist?" + favoriteList);

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
			});
	}, [token]);
	// console.log("you" + storedToken);
	useEffect(() => console.log("changed"), [favoriteList]);

	return (
		// wrapping all child components in a single row

		<BrowserRouter>
			<NavBar
				user={user}
				onLoggedOut={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
			/>
			<div className="movielist">
				<Row className="justify-content-md-center">
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
										onLoggedIn={(user, token, favoriteList) => {
											setUser(user);
											setToken(token);
											setFavoriteList(favoriteList);
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
											token={token}
											favoriteList={favoriteList}
											onLoggedOut={() => {
												setUser(null);
												setToken(null);
												setFavoriteList(null);
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
									<>
										{movies.map((movie) => (
											<MovieCard
												id={movie.id}
												user={user}
												movieData={movie}
												favoriteList={favoriteList}
												md={3}
												token={token}
											/>
										))}
									</>
								)
							}
						/>
					</Routes>
				</Row>
			</div>
		</BrowserRouter>
	);
};
