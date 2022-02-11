import dotenv from "dotenv";

dotenv.config();

// Environment variables with defaults
export const PORT = process.env.PORT || 80;
export const NODE_ENV = process.env.NODE_ENV || "dev";
export const CLIENT_SITE_URL = process.env.CLIENT_SITE_URL || "localhost:3000";
