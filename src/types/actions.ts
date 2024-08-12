import { UnknownAction } from "redux";
import User from "./user";

export const CHANGE_USER = "CHANGE_USER";

export interface ChangeUserAction extends UnknownAction {
  type: typeof CHANGE_USER;
  payload: User | null;
}

export type AppActions = ChangeUserAction;
