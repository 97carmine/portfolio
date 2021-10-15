import { useEffect } from "react";

const setHeader = (url: string): void => {
	useEffect(() => {
		if (document) {
			const { host, protocol } = document.location;
			const canonical = document.querySelector('link[rel="canonical"]');

			if (canonical instanceof HTMLLinkElement) {
				canonical.href = new URL(url, `${protocol}//${host}`).toString();
			}
		}
	}, []);
};

export { setHeader };
