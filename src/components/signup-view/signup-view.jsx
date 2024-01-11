import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			username: username,
			password: password,
			email: email,
			birthday: birthday,
		};

		fetch("https://shrouded-ocean-05047.herokuapp.com/users", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.ok) {
				alert("Signup successful");
				window.location.reload();
				window.location.replace("/login");
			} else {
				alert("Signup failed");
			}
		});
	};

	return (
		<Col
			md={5}
			className="m-5"
		>
			<Form
				onSubmit={handleSubmit}
				className="p-5 bg-light rounded"
			>
				<h1>Signup:</h1>
				<Form.Group controlId="formGroupUsername">
					<Form.Label>
						Username:
						<Form.Control
							style={{ "background-color": "#E7F0FE" }}
							type="text"
							value={username}
							minLength="5"
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group controlId="formGroupPassword">
					<Form.Label>
						Password:
						<Form.Control
							style={{ "background-color": "#E7F0FE" }}
							type="password"
							value={password}
							minLength="5"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group controlId="formGroupEmail">
					<Form.Label>
						Email:
						<Form.Control
							style={{ "background-color": "#E7F0FE" }}
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group controlId="formGroupBirthday">
					<Form.Label>
						Birthday:
						<Form.Control
							style={{ "background-color": "#E7F0FE" }}
							type="date"
							value={birthday}
							onChange={(e) => setBirthday(e.target.value)}
							required
						/>
					</Form.Label>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					className="mt-3"
				>
					Signup
				</Button>
			</Form>
		</Col>
	);
};
