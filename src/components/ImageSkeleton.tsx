import { Skeleton, Box, styled } from "@mui/material";
import { useState } from "react";

const ImageStyled = styled(Box)(({ theme }) => ({
  position: "relative", // Necesario para posicionar el pseudo-elemento
  objectFit: "cover",
  width: "100%",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius, // Usa el valor de tema si es necesario
  overflow: "hidden", // Asegura que los bordes sean respetados
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 105, 180, 0.5)", // Rosa con opacidad
    opacity: 0, // Inicialmente invisible
    transition: "opacity 0.3s ease",
    borderRadius: "inherit",
    zIndex: 2,
  },
  "&:hover img": {
    transform: "scale(1.05)", // Efecto de escala en hover
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", // Sombra intensa
  },
  "&:hover::after": {
    opacity: 1, // Overlay visible en hover
  },
  "&:active img": {
    transform: "scale(0.95)", // Reducción al presionar
  },
}));

export default function ImageSkeleton({ src, height, children, alt }:  { src: string, alt: string, height: number, children?: React.ReactNode  }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box
      sx={{ position: "relative", width: "100%", height, overflow: "hidden" }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      <ImageStyled sx={{ height }}>
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          style={{
            visibility: loaded ? "visible" : "hidden",
            opacity: loaded ? 1 : 0, // Se muestra progresivamente
            transform: loaded ? "scale(1)" : "scale(1.1)",
            transition: loaded
              ? "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease"
              : "opacity 0.5s ease, transform 0.5s ease",
          }}
        />
      </ImageStyled>
      {children && children}
    </Box>
  );
}
