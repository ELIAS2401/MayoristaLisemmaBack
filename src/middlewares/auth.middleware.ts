import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "NO_AUTH_HEADER" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // 🔴 DEBUG DURO
    if (!decoded.id) {
      return res.status(401).json({
        message: "TOKEN_SIN_ID",
        decoded
      });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "TOKEN_INVALIDO" });
  }
};

