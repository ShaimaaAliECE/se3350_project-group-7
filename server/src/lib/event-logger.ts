import fs from "fs";
import { getId } from "./id";
import { Event } from "../interfaces";
import path from "path";
import { Request } from "express";
import { Action } from "../interfaces/Action";

const folderpath = path.join(__dirname, "..", "..", "data");

const filepath = path.join(folderpath, "events.log");

export function log(id: string, action: Action, payload: any) {
  const timestamp = Date.now().toString();
  const event: Event = {
    id,
    timestamp,
    action,
    payload,
  };
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(folderpath, { recursive: true });
    fs.writeFileSync(filepath, "\n");
  }
  const data = `${JSON.stringify(event)}\n`;
  fs.appendFileSync(filepath, data);
}

export interface GetOptions {
  start?: Date;
  end?: Date;
  actions?: string[];
}

function get(options?: GetOptions) {
  const { start, end, actions } = options || {};

  const rawData = fs.readFileSync(filepath, "utf-8");
  const lines = rawData
    .split("\n")
    .filter((line) => !!line)
    .map((line) => JSON.parse(line))
    .filter((log) => {
      const timestamp = new Date(parseInt(log.timestamp));
      if (start && timestamp.valueOf() < start.valueOf()) {
        return false;
      }
      if (end && timestamp.valueOf() > end.valueOf()) {
        return false;
      }
      if (actions && actions.length > 0 && !actions.includes(log.action)) {
        return false;
      }
      return true;
    });
  return lines;
}

export default {
  get,
  log,
};
