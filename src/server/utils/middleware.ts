import { NextFunction, Request, Response } from "express";

const asyncMiddleware =
	(asyncFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
	(req: Request, res: Response, next: NextFunction): void => {
		Promise.resolve(asyncFunction(req, res, next)).catch(next);
	};

export { asyncMiddleware };
