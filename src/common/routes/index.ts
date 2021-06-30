import Home from "../components/home";
import Projects from "../components/projects";
import Contact from "../components/contact";
import LegalWarning from "../components/legal_warning";
import PrivacyPolicy from "../components/privacy_policy";
import Resume from "../components/resume";
import { IRoutes } from "../utils/interfaces";

const routes: Array<IRoutes> = [
	{
		path: `/`,
		component: Home,
		exact: true,
	},
	{
		path: `/projects`,
		component: Projects,
		exact: true,
	},
	{
		path: `/contact`,
		component: Contact,
		exact: true,
	},
	{
		path: `/legal_warning`,
		component: LegalWarning,
		exact: true,
	},
	{
		path: `/privacy_policy`,
		component: PrivacyPolicy,
		exact: true,
	},
	{
		path: `/resume`,
		component: Resume,
		exact: true,
	},
];

export default routes;
