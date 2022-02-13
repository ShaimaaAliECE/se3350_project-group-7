import { Router } from "express";
import { log } from "../lib/event-logger";
import { getId } from "../lib/id";

const router = Router();

// Logs a new event
router.post("/", (req, res) => {
  const action = req.body.action as string;
  log(req, action);
  return res.status(200).send();
});

export default router;
