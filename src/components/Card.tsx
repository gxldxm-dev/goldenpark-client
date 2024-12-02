import { Box, Typography, Chip, Skeleton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const getImageStyles = (height: number) => ({
  // position: "relative", // Necesario para que el pseudo-elemento se posicione sobre la imagen
  objectFit: "cover",
  width: "100%",
  height,
  cursor: "pointer",
  borderRadius: 2,
  // Overlay rosa en hover
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 105, 180, 0.5)", // Rosa con opacidad
    opacity: 0, // Inicialmente invisible
    transition: "opacity 0.3s ease", // Transición suave para la opacidad
    borderRadius: "inherit", // Hereda el borderRadius de la imagen
    zIndex: 2, // Asegura que el overlay esté por encima de la imagen
  },

  // TODO No funcionan solucionar
  "&:hover": {
    opacity: 0.8,
    transform: "scale(1.05)", // Aumenta ligeramente el tamaño de la imagen
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", // Agrega una sombra más intensa
    "&::after": {
      opacity: 1, // Hace visible el overlay rosa en hover
    },
  },

  // Efectos en active (cuando se presiona)
  "&:active": {
    transform: "scale(0.95)", // Reduce el tamaño ligeramente cuando se presiona
  },
});

const textStyles = {
  flex: 1,
  textDecoration: "none", // Elimina el subrayado del enlace
  // color: "primary.main", // Color base (usa el tema de MUI si está configurado)
  fontWeight: 500,
  fontSize: 18, // Tamaño de fuente
  transition: "color 0.3s ease, transform 0.2s ease", // Transiciones suaves para los estados
  "&:hover": {
    color: "secondary.main", // Cambia el color al pasar el ratón
    textDecoration: "underline", // Subrayado en hover
  },
  "&:active": {
    transform: "scale(0.95)", // Escala al presionar
    color: "secondary.dark", // Color más oscuro en estado activo
  },
};
interface CardXProps {
  item: any;
  to: string;
  endpoint: string;
  imageHeight?: number;
}

export default function CardX({ item, to, imageHeight = 200 }: CardXProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box flex={1} m={0}>
      <Box sx={{ position: "relative", width: "100%", height: imageHeight, overflow: "hidden" }}>
        {!loaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
        <Box
          component="img"
          src={`http://localhost:3000/api/images/cover/${item._id}`}
          alt={item.name}
          sx={getImageStyles(imageHeight)}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          style={{
            visibility: loaded ? "visible" : "hidden",
            opacity: loaded ? 1 : 0, // Se muestra progresivamente
            transform: loaded ? "scale(1)" : "scale(1.1)",
            transition: loaded ? "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease" : "opacity 0.5s ease, transform 0.5s ease",
          }}
        />
        {item.studio && (
          <Chip
            label={item.studio.name}
            color="primary"
            sx={{
              position: "absolute",
              left: 0,
              margin: "10px 0 0 10px",
              zIndex: 3,
            }}
          />
        )}
      </Box>

      <Box display="flex" width="100%">
        <Typography
          variant="body2"
          component={Link}
          to={to}
          textAlign="center"
          sx={textStyles}
        >
          {item.name.split("")[0].toUpperCase() + item.name.slice(1)}
        </Typography>
      </Box>
    </Box>
  );
}
