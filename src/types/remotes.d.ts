declare module "host/GlobalContext" {
  import type { Context } from "react";

  export interface GlobalState {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (value: number) => void;
  }

  const GlobalContext: Context<GlobalState | undefined>;
  export default GlobalContext;
}
