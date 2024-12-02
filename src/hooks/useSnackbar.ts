import { useState, useCallback } from 'react';

// Custom hook para manejar Snackbar
export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'

  // Función para abrir el Snackbar con un mensaje específico
  const showSnackbar = useCallback((message, severity = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  // Función para cerrar el Snackbar
  const closeSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, message, severity, showSnackbar, closeSnackbar };
};
