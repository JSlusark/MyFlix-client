import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const NavBarAuthenticated = ({ onLoggedOut }) => {
	return (
		<>
			<Nav.Link
				as={Link}
				to="/"
			>
				Home
			</Nav.Link>
			<Nav.Link
				as={Link}
				to="/profileview"
			>
				Profile
			</Nav.Link>
			<Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
		</>
	);
};
