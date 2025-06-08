import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ProfileUpdateView = ({ user, token }) => {
	const [updatedUsername, setUpdatedUsername] = useState("");
	const [updatedPassword, setUpdatedPassword] = useState("");
	const [updatedEmail, setUpdatedEmail] = useState("");
	const [updatedBirthday, setUpdatedBirthday] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			username: updatedUsername || user.username,
			password: updatedPassword || user.password,
			email: updatedEmail || user.email,
			birthday: updatedBirthday || user.birthday,
		};

		fetch(`https://mymovielist-api-dhqp.onrender.com/users/${user.username}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					alert("Profile updated successfully");
					// Reset form fields
					setUpdatedUsername("");
					setUpdatedPassword("");
					setUpdatedEmail("");
					setUpdatedBirthday("");
				} else {
					throw new Error("Failed to update profile");
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="p-5 bg-light rounded"
		>
			<h1>Update Profile:</h1>
			<Form.Group controlId="formGroupUsername">
				<Form.Label>
					Username:
					<Form.Control
						style={{ backgroundColor: "#E7F0FE" }}
						type="text"
						value={updatedUsername}
						onChange={(e) => setUpdatedUsername(e.target.value)}
					/>
				</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGroupPassword">
				<Form.Label>
					Password:
					<Form.Control
						style={{ backgroundColor: "#E7F0FE" }}
						type="password"
						value={updatedPassword}
						onChange={(e) => setUpdatedPassword(e.target.value)}
					/>
				</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGroupEmail">
				<Form.Label>
					Email:
					<Form.Control
						style={{ backgroundColor: "#E7F0FE" }}
						type="email"
						value={updatedEmail}
						onChange={(e) => setUpdatedEmail(e.target.value)}
					/>
				</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGroupBirthday">
				<Form.Label>
					Birthday:
					<Form.Control
						style={{ backgroundColor: "#E7F0FE" }}
						type="date"
						value={updatedBirthday}
						onChange={(e) => setUpdatedBirthday(e.target.value)}
					/>
				</Form.Label>
			</Form.Group>

			<Button
				variant="primary"
				type="submit"
				className="mt-3"
			>
				Update Profile
			</Button>
		</Form>
	);
};
