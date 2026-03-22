import { useMemo } from "react";
import { useSnackbar } from "./useSnackbar";

export const useNotify = () => {
  const { enqueue } = useSnackbar();

  return useMemo(
    () => ({
      success: (message: string) => enqueue({ message, severity: "success" }),
      error: (message: string) => enqueue({ message, severity: "error" }),
      info: (message: string) => enqueue({ message, severity: "info" }),
      warn: (message: string) => enqueue({ message, severity: "warning" }),
    }),
    [enqueue],
  );
};
