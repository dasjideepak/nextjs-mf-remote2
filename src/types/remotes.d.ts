declare module "host/GlobalContext" {
  import type { Context } from "react";

  type NotificationType = "info" | "success" | "warning" | "error";

  interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    timestamp: number;
  }

  export interface GlobalState {
    isHydrated: boolean;
    isAuthenticated: boolean;
    user: { id: string; name: string; role: "customer" | "admin" } | null;
    loginAs: (role: "customer" | "admin") => void;
    logout: () => void;
    theme: "light" | "dark";
    toggleTheme: () => void;
    notifications: Notification[];
    addNotification: (message: string, type: NotificationType) => void;
    dismissNotification: (id: string) => void;
    clearNotifications: () => void;
  }

  const GlobalContext: Context<GlobalState | undefined>;
  export default GlobalContext;
}

