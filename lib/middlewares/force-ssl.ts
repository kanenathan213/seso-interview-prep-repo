// See: https://github.com/paulomcnally/node-heroku-ssl-redirect/blob/master/src/index.ts

import { Request, Response, NextFunction } from "express";

type Environment = "production" | "development" | "other";

const forceSSL = (environments: Environment[] = ["production"], status: 301 | 302 = 302) => {
  const currentEnv = process.env.NODE_ENV as Environment;

  const isCurrentEnv = environments.includes(currentEnv);

  return (req: Request, res: Response, next: NextFunction) => {
    if (isCurrentEnv) {
      req.headers["x-forwarded-proto"] !== "https"
        ? res.redirect(status, "https://" + req.hostname + req.originalUrl)
        : next();
    } else next();
  };
};

export default forceSSL;
