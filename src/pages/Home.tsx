import { Box, Typography, CircularProgress, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Category, Girl, Video } from "../types";
import { useData } from "../hooks/useData";
import Card from "../components/card";


export default function Home() {
  const { categories, girls, videos, studios, loading, error } = useData();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress /> 
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* categories section */}
      <SectionPreview data={categories} name="categories" to="category" />
      {/* girls section */}
      <SectionPreview data={girls} name="girls" to="girl" imageHeight={350}/>
      {/* videos section */}
      <SectionPreview data={videos} name="videos" to="video" imageHeight={230} maxItems={5}/>
      {/* videos section */}
      <SectionPreview data={studios} name="studios" to="studio"/>
    </Box>
  );
}

function SectionPreview({ name, data, to, imageHeight, maxItems }: { data: any[], name: string, to: string}) {
  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center">
        <Typography variant="h5">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
        <Link to={`/${name}`} style={{ marginLeft: 'auto' }}>see all</Link>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap" // Permitir que los elementos se ajusten en varias filas
        gap={2} // Espacio entre los elementos
      >
        {data.slice(0, maxItems || 6 ).map((item) => (
          <Card 
          item={item} 
          endpoint={`http://localhost:3000/api/${name}`} 
          to={`/${to}/${item._id}`} 
          imageHeight={imageHeight}
        />
        ))}
      </Box>
    </Box>
  )
}
