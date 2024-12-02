import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const useShowSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
      throw new Error('useShowSnackbar debe ser usado dentro de un SnackbarProvider');
    }
    return context.showSnackbar;
  };
  