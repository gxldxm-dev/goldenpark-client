import { createContext } from "react";

interface SnackbarContextType {
    message: string;
    open: boolean;
    severity: 'success' | 'error' | 'info' | 'warning'; // Define los tipos para severity
    showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
    hideSnackbar: () => void;
  }
  

  
  // Crea el contexto con los tipos
  export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
