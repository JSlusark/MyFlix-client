import "./index.scss";
import Container from "react-bootstrap/Container";

import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";

const App = () => {
	return (
		<Container fluid>
			<MainView />
		</Container>
	);
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
