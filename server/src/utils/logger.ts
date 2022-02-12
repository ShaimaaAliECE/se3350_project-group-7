import logger, { format, transports } from "winston";
import { NODE_ENV } from "../config";

logger.add(
  // Create an error log no matter which node environment we're in
  new transports.File({
    filename: "error.log",
    level: "error",
    format: format.combine(format.timestamp(), format.json()),
  })
);

// When we're not in production, log general info as well
if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: "info",
    })
  );
  logger.add(
    new transports.File({
      filename: "info.log",
      format: format.combine(format.timestamp(), format.json()),
      level: "info",
    })
  );
}

export default logger;
