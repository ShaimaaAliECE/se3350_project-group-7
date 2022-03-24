import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import fs from "fs";
import pino from "express-pino-logger";
import routes from "./routes";

const app = express();

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
  staticPath = path.join(__dirname, "..", "..", "..", "client", "build");
} else {
  staticPath = path.join(__dirname, "..", "public");
}

app.use(express.static(staticPath));

// Use all application routes behind the /api route
app.use("/api", routes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
