import { createContext } from "react";
import type { Severity } from "@components/core";

export interface SnackbarQueueItem {
  message: string;
  severity: Severity;
}

export type SnackbarContextType = {
  queue: SnackbarQueueItem[];

  enqueue: (item: SnackbarQueueItem) => void;
  dequeue: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
