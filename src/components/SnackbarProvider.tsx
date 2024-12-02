import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '../hooks/useSnackbar'; // Importa el hook
import { SnackbarContext } from '../contexts/SnackbarContext';

// Crea un contexto para el Snackbar


export const SnackbarProvider = ({ children }) => {
  const { open, message, severity, closeSnackbar, showSnackbar } = useSnackbar();

  return (
    <SnackbarContext.Provider value={{ showSnackbar: showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom hook para acceder al showSnackbar desde cualquier componente
