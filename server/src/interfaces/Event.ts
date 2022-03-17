import { Action } from "./Action";

export interface Event {
  timestamp: string;
  id: string;
  action: Action;
  payload: any;
}
