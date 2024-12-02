import { Box, Typography, CircularProgress, Pagination } from "@mui/material";
import ButtonUploader from "../components/ButtonUploader";
import axios from "axios";
import VideoGrid from "../components/VideoGrid";
import { useData } from "../hooks/useData";
import usePagination from "../hooks/usePagination";

const Videos = () => {
  const { videos, loading, error } = useData();

  /* async function handleUpload(formData) {
    const video = await axios.post("http://localhost:3000/api/videos/create", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return video;
  }

  const videosToShow = videos.filter(video => video.girls.length === 0);
  const itemsPerPage = 9; // Define cuántos videos quieres por página
  const { currentData, currentPage, totalPages, goToPage } = usePagination(videosToShow, itemsPerPage);

  const handlePageChange = (event, page) => {
    goToPage(page); // Cambia la página actual con el hook
  };
 */


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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
    <Box mt={4}>
      {/* Encabezado */}
      <Box display={"flex"} alignItems={"center"}>
        <Typography variant="h4" gutterBottom>
          Videos
        </Typography>
        <Box display={"flex"} marginLeft={"auto"}>
          <ButtonUploader/>
        </Box>
      </Box>

      {/* Grid de videos paginados */}
      <VideoGrid videos={videos} />

      {/* Paginador */}
     {/*  <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box> */}
    </Box>
  );
};



export default Videos;