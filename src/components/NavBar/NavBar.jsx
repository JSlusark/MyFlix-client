import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavBarUnAuthenticated } from "./NavBarUnAuthenticated";
import { NavBarAuthenticated } from "./NavBarAuthenticated";

export const NavBar = ({ user, onLoggedOut }) => {
	return (
		<Navbar
			bg="dark"
			variant="dark"
			expand="lg"
		>
			<Container
				style={{
					marginLeft: "42px",
					marginRight: "42px",
					padding: "5px",
				}}
			>
				<Navbar.Brand
					as={Link}
					to="/"
				>
					My Movie
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{user ? (
							<NavBarAuthenticated onLoggedOut={onLoggedOut} />
						) : (
							<NavBarUnAuthenticated />
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
