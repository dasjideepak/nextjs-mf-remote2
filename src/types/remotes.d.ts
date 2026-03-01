declare module "host/GlobalContext" {
  import type { Context } from "react";
  import type { HostGlobalState } from "../types/hostGlobalState";

  const GlobalContext: Context<HostGlobalState | undefined>;
  export default GlobalContext;
}

