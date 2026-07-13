import { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose-cjs";

const clientUrl = process.env.NEXT_CLIENT_URL || "http://localhost:3000";

const JWKS = createRemoteJWKSet(
  new URL(`${clientUrl}/api/auth/jwks`)
);

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).send({ message: "Forbidden" });
  }
};
