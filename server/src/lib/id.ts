import { Request } from "express";
import crypto from "crypto";

export function getId(req: Request) {
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const id = crypto.createHash("md5").update(`${userAgent}${ip}`).digest("hex");
  return id;
}
