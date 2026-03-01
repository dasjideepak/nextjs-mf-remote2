import React, { useState, FormEvent } from "react";
import { useSharedGlobalState } from "@/hooks/globalState";

interface DashboardAppProps {
  sharedState?: {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (value: number) => void;
  };
}

export default function DashboardApp({ sharedState }: DashboardAppProps) {
  const { isLoading, state } = useSharedGlobalState();
  const resolvedState = sharedState ?? state;
  const [inputValue, setInputValue] = useState("");

  if (isLoading && !sharedState) {
    return <p className="text-gray-500">Loading shared global state...</p>;
  }

  if (!resolvedState) {
    return (
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-6 text-yellow-800">
        <h2 className="text-lg font-semibold text-gray-900">Remote2</h2>
        <p className="mt-2 text-sm">
          Global context is not available. This component must be rendered
          inside the Host shell to access shared state.
        </p>
      </div>
    );
  }

  const { count, setCount } = resolvedState;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = Number(inputValue);
    if (!Number.isNaN(parsed)) {
      setCount(parsed);
      setInputValue("");
    }
  };

  return (
    <div className="m-4 rounded-xl border-2 border-emerald-500 bg-white p-6">
      <h2 className="mt-0 text-lg font-semibold text-gray-900">Remote2</h2>
      <p className="mt-2 text-base text-gray-800">
        Current count: <strong>{count}</strong>
      </p>

      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new count"
          className="w-40 rounded-md border border-gray-300 px-2.5 py-1.5"
        />
        <button
          type="submit"
          className="rounded-md bg-emerald-500 px-3.5 py-1.5 text-white transition hover:bg-emerald-600"
        >
          Set Count
        </button>
      </form>
    </div>
  );
}
