import express from "express";
import { getId } from "../lib/id";
import eventsRouter from "./events-router";

// Configure all routes
const router = express.Router();

router.get("/ping", (req, res) => {
  const id = getId(req);
  return res.status(200).send({ message: "OK", id });
});

router.use("/events", eventsRouter);

export default router;
