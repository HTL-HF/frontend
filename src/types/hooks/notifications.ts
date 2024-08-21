import { AlertColor } from "@mui/material";

export interface NotificationContextType {
  showNotification: (message: string, severity: AlertColor) => void;
}