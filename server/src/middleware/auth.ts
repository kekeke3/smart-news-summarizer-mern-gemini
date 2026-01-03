// server/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // For development, you can use a mock user
  // In production, implement proper JWT authentication
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // For demo, use mock user ID
    req.user = {
      id: "demo-user-id",
      email: "demo@example.com",
    };
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
