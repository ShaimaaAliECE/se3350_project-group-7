import { Router } from "express";
import eventLoggger, { log } from "../lib/event-logger";

const router = Router();

// Returns logs corresponding to requesting agent
router.get("/", (req, res) => {
  const actions = req.query.actions as string[];
  const start = req.query.start as string;
  const end = req.query.end as string;

  let _actions: string[] = [];
  if (actions instanceof Array) {
    _actions = actions;
  }

  // ensure provided start and end date values are valid
  // otherwise, set as null
  let _start, _end;
  if (isNaN(Date.parse(start))) {
    _start = null;
  } else {
    _start = new Date(start);
  }
  if (isNaN(Date.parse(end))) {
    _end = null;
  } else {
    _end = new Date(end);
  }

  const logs = eventLoggger.get(req, {
    actions: _actions,
    start: _start,
    end: _end,
  });
  return res.status(200).send({ logs });
});

// Logs a new event
router.post("/", (req, res) => {
  const action = req.body.action as string;
  log(req, action);
  return res.status(200).send();
});

export default router;
