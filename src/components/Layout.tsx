import Header from "./Header";
import Footer from "./Footer"
import { Box } from "@mui/material";
import TaskManager from "./TaskManager"
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container>
        {children} {/* Aquí se renderizan las páginas */}
      </Container>
      <TaskManager />
      <Footer />
    </>
  );
}

const Container = ({ children, maxWidth = '70%' }) => {
  return (
    <Box
      sx={{
        width: maxWidth, // Ocupa el 90% o el ancho máximo especificado
        margin: '0 auto', // Centrado horizontal
        padding: '16px', // Espaciado interno (opcional)
      }}
    >
      {children}
    </Box>
  );
};



export default Layout;