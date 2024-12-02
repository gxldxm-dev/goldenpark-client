import { createTheme } from "@mui/material";

const colorPinkPrimary ="#FF4191"
const colorPinkSecondary = "#E90074"
const colorAlert = "#FFF078"
const theme = createTheme({
    palette: {
      mode: 'dark', // Activa el modo oscuro
      background: {
        default: '#000', // Color de fondo por defecto
        paper: '#040202', // Color de fondo para los papeles (tarjetas, modales, etc.)
      },
      text: {
        primary: '#ffffff', // El color principal de texto será blanco
        secondary: '#FF4191', // El color secundario de texto será gris
      },
      primary: {
        main: colorPinkPrimary
      },
      secondary: {
        main: colorPinkSecondary
      }
    },
    typography: {
      fontFamily: "sans-serif",// 'Cherry Bomb One', 
      allVariants: {
        color: '#ffffff', // Define el color blanco por defecto para todas las variantes de Typography
      },
    },

    components: {
      // Personalizar Paper
      MuiContainer: {
        defaultProps: {
          maxWidth: false, // Desactiva los anchos predefinidos
        },
        styleOverrides: {
          root: {
            maxWidth: '2000px', // Define tu ancho personalizado
          },
        },
      },
    },
  });

  export default theme;