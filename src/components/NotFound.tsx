import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
interface Error404Props {
  message?: string; // Mensaje personalizado opcional
}

export default function NotFound({ message = "The link might be corrupted, or the page may have been removed." }: Error404Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f9f9f9" // Fondo claro
    >
      <Typography variant="h1" fontWeight="bold" fontSize="6rem" color="#000">
        404
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={2}>
        Oops, This Page Not Found!
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1} mb={4}>
        {message}
      </Typography>
      <Button LinkComponent={Link} href={"/"} variant="contained" color="primary">
        Go Back Home
      </Button>
    </Box>
  );
};

