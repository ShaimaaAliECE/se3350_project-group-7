import { Router } from "express";
import { Action } from "../interfaces/Action";
import eventLoggger, { log } from "../lib/event-logger";
import { getId } from "../lib/id";

const router = Router();

router.get("/", (req, res) => {
  const actions = req.query.actions as Action[];
  const start = req.query.start as string;
  const end = req.query.end as string;

  let _actions: Action[] = [];
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

  const logs = eventLoggger.get({
    actions: _actions,
    start: _start,
    end: _end,
  });
  return res.status(200).send({ logs });
});

// Logs a new event
router.post("/", (req, res) => {
  const id = getId(req);
  const action = req.body.action as Action;
  const payload = req.body.payload;
  log(id, action, payload);
  return res.status(200).send();
});

export default router;
