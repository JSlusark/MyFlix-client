import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavBarUnAuthenticated } from "./NavBarUnAuthenticated";
import { NavBarAuthenticated } from "./NavBarAuthenticated";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../img/logo.png";
import "./nav-bar.scss";

export const NavBar = ({ user, onLoggedOut }) => {
	console.log(logo);
	return (
		<Navbar
			bg="dark"
			variant="dark"
			expand="lg"
			className="p-3 ps-5 pe-5 align-items-baseline d-flex"
		>
			<Navbar.Brand
				as={Link}
				to="/"
				className="align-items-baseline fs-1 navbarTitle"
			>
				<img
					fluid
					alt=""
					src={logo}
					className="logo me-3 inline-block align-middle"
				/>
				My Movie List
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto d-flex align-items-baseline ">
					{user ? (
						<NavBarAuthenticated onLoggedOut={onLoggedOut} />
					) : (
						<NavBarUnAuthenticated />
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
