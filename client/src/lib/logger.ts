import axios from "axios";

export type Action =
  | "FINISH_LEVEL_1"
  | "FINISH_LEVEL_2"
  | "FINISH_LEVEL_3"
  | "FINISH_LEVEL_4"
  | "FINISH_LEVEL_5"
  | "EXIT"
  | "RESTART";

export function logActionToServer(action: Action, payload: any): void {
  axios.post("/api/events/", { action, payload });
}

export function retrieveActionFromServer() {
  axios.get("/api/events/").then((resp) => {
    return resp.data;
  });
}
