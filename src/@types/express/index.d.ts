import { IntlShape } from "react-intl";

declare global {
	namespace Express {
		interface Request {
			fullURL: URL;
			language: IntlShape;
		}
	}
}
