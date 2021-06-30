import { FC } from "react";

interface IEmail {
	full_name: string;
	email: string;
	data: string;
}

interface IRoutes {
	path: string;
	component: FC;
	exact: boolean;
}

export { IEmail, IRoutes };
