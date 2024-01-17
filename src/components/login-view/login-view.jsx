import React from "react";
import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// validation of user login
	const handleSubmit = (event) => {
		// prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			username: username,
			password: password,
		};

		//link needs to be changed or endpoint to be added
		fetch("https://shrouded-ocean-05047.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log("Login response: ", data);
				// console.log(username);
				// console.log(password);
				// console.log(data.user.email);
				// console.log(data.user.birthday);
				// data.user.favoriteMovies.map((movie) => console.log(movie));

				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));
					localStorage.setItem("token", data.token);
					onLoggedIn(data.user, data.token, data.user.favoriteMovies);
				} else {
					alert("No such user");
				}
			})
			.catch((e) => {
				alert("Something went wrong");
			});
	};

	// submit form login
	return (
		<Col
			xs={7}
			className="mx-auto mt-5 p-5 bg-light rounded"
		>
			<Form onSubmit={handleSubmit}>
				<h1 className="text-center fs-1 mb-4">Log in</h1>

				<Form.Group
					controlId="formUsername"
					className="m-4"
				>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						style={{ "background-color": "#E7F0FE" }}
						type="text"
						value={username}
						minLength="3"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group
					controlId="formPassword"
					className="m-4"
				>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						style={{ "background-color": "#E7F0FE" }}
						type="password"
						value={password}
						minLength="5"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group class="d-grid gap-2 col-3 mx-auto">
					<Button
						variant="primary"
						type="submit"
						className=" mt-4"
					>
						Submit
					</Button>
				</Form.Group>
			</Form>
		</Col>
	);
};
