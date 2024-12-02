import { Box, Typography, CircularProgress } from "@mui/material";

interface LoadingErrorWrapperProps {
    loading: boolean;
    error: string | null;
    customLoadingComponent?: React.ReactNode; // Para personalizar el spinner
    customErrorComponent?: React.ReactNode;  // Para personalizar el error
  }
export default function AsyncStatusHandler({
    loading,
    error,
    customLoadingComponent,
    customErrorComponent,
  }: LoadingErrorWrapperProps) {
    if (loading) {
      return customLoadingComponent || (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return customErrorComponent || (
        <Box textAlign="center" mt={4}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      );
    }
  };

  
