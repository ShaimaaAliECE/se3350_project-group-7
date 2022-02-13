import fs from "fs";
import { getId } from "./id";
import { Event } from "../interfaces";
import path from "path";
import { Request } from "express";

const folderpath = path.join(__dirname, "..", "..", "data");

const filepath = path.join(folderpath, "events.log");

export function log(req: Request, action: string) {
  const id = getId(req);
  const timestamp = Date.now().toString();
  const event: Event = {
    id,
    timestamp,
    action,
  };
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(folderpath, { recursive: true });
    fs.writeFileSync(filepath, "");
  }
  const data = `${JSON.stringify(event)}\n`;
  fs.appendFileSync(filepath, data);
}
