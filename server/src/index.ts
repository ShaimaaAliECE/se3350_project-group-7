import { PORT } from "./config";
import logger from "./utils/logger";
import app from "./app";

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
