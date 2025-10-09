"use client";
import { createContext, useContext, useState } from "react";

const DateModeCtx = createContext({ mode: "relative", setMode: () => {} });

export function DateModeProvider({ children, initial = "relative" }) {
  const [mode, setMode] = useState(initial);
  return (
    <DateModeCtx.Provider value={{ mode, setMode }}>
      {children}
    </DateModeCtx.Provider>
  );
}

export function useDateMode() {
  return useContext(DateModeCtx);
}
