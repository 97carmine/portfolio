import { RouteObject } from "react-router-dom";
import Home from "../components/home";
import Projects from "../components/projects";
import Contact from "../components/contact";
import LegalWarning from "../components/legal_warning";
import PrivacyPolicy from "../components/privacy_policy";
import Resume from "../components/resume";
import NotFound from "../components/not_found";

const routes: RouteObject[] = [
	{ path: "/", element: <Home /> },
	{ path: "/contact", element: <Contact /> },
	{ path: "/legal_warning", element: <LegalWarning /> },
	{ path: "/privacy_policy", element: <PrivacyPolicy /> },
	{ path: "/projects", element: <Projects /> },
	{ path: "/resume", element: <Resume /> },
	{ path: "*", element: <NotFound /> },
];

export default routes;
