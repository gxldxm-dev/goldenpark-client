import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import AppProviders from "./AppProviders";
import routes from "./routes";
import "./App.css";
import { CircularProgress, Fade } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  useEffect(() => {
    // Deshabilitar el context menu globalmente
    const disableContextMenu = (event) => {
      event.preventDefault();
    };

    // Añadir el evento cuando el componente se monta
    document.addEventListener('contextmenu', disableContextMenu);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);
  return (
    <AppProviders>
      <Router>
        <Suspense fallback={<Loading />}>
        <AppRoutes />

        </Suspense>
      </Router>
    </AppProviders>
  );
}

function AppRoutes(){

  const routesComponents = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));
  return(<Layout>
    <Routes>{routesComponents}</Routes>
  </Layout>)
}
export default App;
