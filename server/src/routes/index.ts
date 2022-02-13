import express from "express";
import { getId } from "../lib/id";

// Configure all routes
const router = express.Router();

router.get("/ping", (req, res) => {
  const id = getId(req);
  return res.status(200).send({ message: "OK", id });
});

export default router;
