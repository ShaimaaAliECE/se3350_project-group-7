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

export async function getLogFromServer(action: Action[]) {
  const res = await axios.get(`/api/events/`, { params: { action } });
  return res.data.logs;
}
