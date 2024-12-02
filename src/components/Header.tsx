import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Face3Icon from "@mui/icons-material/Face3";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// Estilos personalizados para el campo de búsqueda
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  border: "2px solid white",
  flex: 1,
  textAlign: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  transition: "color 0.3s ease, transform 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
}));

function Header() {
  const navigate = useNavigate();
  function navigateBack() {
    navigate(-1);
  }

  function navigateForward() {
    navigate(1);
  }

  return (
    <AppBar
      position="relative"
      sx={{
        bgcolor: "#000",
        borderBottom: "3px solid #1c0606",
        padding: "0 10% 0 10%",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", border: "2px solid white"}}>
        <Box flex={1} sx={{ border: "2px solid white" }}>
          <IconButton color="inherit" onClick={navigateBack}>
            <ArrowLeftIcon />
          </IconButton>
          <IconButton color="inherit" onClick={navigateForward}>
            <ArrowRightIcon />
          </IconButton>
        </Box>

        <Box flex={1} sx={{ border: "2px solid white" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: "40px",
              fontFamily: "Lobster",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none", // Quita el subrayado
                textAlign: "center",
                width: "100%", // Ancho 100% del contenedor padre
                color: "inherit", // Hereda el color del contenedor padre
                cursor: "default", // Si no quieres que sea un enlace "clickeable"
              }}
            >
              {"Golden Park"}
            </Link>
          </Typography>
        </Box>
        {/* Logo */}

        {/* Campo de Búsqueda */}

        <Box
          flex={1}
          sx={{
            display: "flex", // Usamos flexbox para que los elementos estén en una sola línea
            alignItems: "center", // Alineamos los elementos verticalmente al centro
            border: "2px solid white",
          }}
        >
          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          {/* Botón de Wallet */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Face3Icon />}
            sx={{ marginLeft: 2, backgroundColor: "#FF0080", color: "#fff" }}
          >
            Im Lucky!
          </Button>

          {/* Iconos de Usuario y Notificaciones */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={{ border: "2px solid white", height: "2rem", display: "flex" }}>
        <StyledLink to="/categories">Categories</StyledLink>
        <StyledLink to="/videos">Videos</StyledLink>
        <StyledLink to="/girls">Girls</StyledLink>
        <StyledLink to="/studios">Studios</StyledLink>
        <StyledLink to="/collections">Collections</StyledLink>
      </Box>
    </AppBar>
  );
}

export default Header;
