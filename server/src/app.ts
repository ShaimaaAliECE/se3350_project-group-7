import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import fs from "fs";
import pino from "express-pino-logger";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: function (_, callback) {
      // No error, 'true' allows CORS for whatever the request origin is
      callback(null, true);
    },
    // Allow the usage of cookies, authorization headers, TLS client certificates from server side
    // Gives browser permission to expose the response to requests with credentials to frontend JavaScript code
    credentials: true,
  })
);

// Log requests to the server and save to file
app.use(
  pino({
    stream: fs.createWriteStream("access.log"),
  })
);
// HTTP request logger middleware; automatically logs incoming HTTP requests to server based on config
app.use(morgan("tiny"));
// Exposes cookies as key value pairs on reqest.cookies
app.use(cookieParser());
// Parses incoming requests with JSON payloads and exposes request body as key value pairs on request.body
app.use(express.json());

let staticPath: string;

if (process.env.NODE_ENV === "production") {
  // In production, we're under src/dist
  staticPath = path.join(__dirname, "..", "..", "public");
} else {
  staticPath = path.join(__dirname, "..", "public");
}

app.use(express.static(staticPath));

// Use all application routes behind the /api route
app.use("/api", routes);

export default app;
