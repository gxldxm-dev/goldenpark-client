import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper, Button } from "@mui/material";
import LabelValue from "../components/LabelValue";
import axios from "axios"
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import { useData } from "../hooks/useData";
import { API_URL } from "../services/api";
import ButtonUploader from "../components/ButtonUploader";
import VideoGrid from "../components/VideoGrid";
import ImageSkeleton from "../components/ImageSkeleton";
const Girl = () => {
  const navigate = useNavigate()
  const showSnackbar = useShowSnackbar()
  const { id } = useParams<{ id: string }>();
  const { girls, videos, loading, error } = useData()

  async function handleDelete() {
    try {
      await axios.post(API_URL + "/girls/delete", { id })
      navigate("/girls");
      showSnackbar("Video deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting video; error: " + error.message, "error");
    }
  }


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

  const girl = girls.find((g) => g._id === id);

  if (!girl) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          Girl not found
        </Typography>
      </Box>
    );
  }

  const videosGirl = videos.filter((video) =>  {
    return video.girls.includes(id as string);
  });

  return (
    <Box>
      {/* photo cover and profile data */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box flex={4}>
          <ImageSkeleton src={`http://localhost:3000/api/images/images/${girl._id}`} alt={girl.name} height={600} />
        </Box>
        <Box flex={8} >
          <Paper sx={{ minHeight: "100%", padding: "40px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            <Typography variant="h4" mt={2}>
              {girl.name}
            </Typography>
            <LabelValue label="Age" value={girl.age} />
            <LabelValue label="Country" value={girl.country || "N/A"} />
            <LabelValue label="Studio" value={girl.studio || "N/A"} />
            <LabelValue label="Status" value={girl.status || "N/A"} />
            <Box display="flex" justifyContent="flex-end" mt="auto">
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* videos girl section */}
      <Box>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h4" gutterBottom>
            Videos
          </Typography>
          <Box display={"flex"} marginLeft={"auto"}>
            <ButtonUploader girlId={id}/>
          </Box>
        </Box>
        <VideoGrid videos={videosGirl} />
      </Box>
    </Box>
  );
};

export default Girl;