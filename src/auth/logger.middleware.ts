import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`, req.headers, req.cookies);
  // console.log(`Response...`, res.cookie);
  next();
}
