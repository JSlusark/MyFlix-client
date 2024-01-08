import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const NavBarUnAuthenticated = () => {
	return (
		<>
			<Nav.Link
				as={Link}
				to="/login"
			>
				Login
			</Nav.Link>
			<Nav.Link
				as={Link}
				to="/signup"
			>
				Signup
			</Nav.Link>
		</>
	);
};
