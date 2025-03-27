import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate token
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
};

// Verify Token
export const verifyToken = (token: string): JwtPayload | string | null => {
    try {
      return jwt.verify(token, SECRET_KEY) as JwtPayload | string;
    } catch (error) {
      console.error('Invalid token:', (error as Error).message);
      return null;
    }
  };
