import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper, Button } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios"
import ChipSelect from "../components/ChipSelect";
import { useData } from "../hooks/useData";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import { API_URL } from "../services/api";
import LabelValue from "../components/LabelValue";

const VideoPage = () => {
  const navigate = useNavigate();
  const showSnackbar = useShowSnackbar();
  const { videos, categories, loading, error } = useData()
  const { id } = useParams<{ id: string }>();

  async function handleDelete() {
    try {
      await axios.post(API_URL + "/videos/delete", { id })
      navigate("/videos");
      showSnackbar("Video deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting video; error: " + error.message, "error");
    }
  }

  async function handleSaveCategories(selectedCategories: string[]) {
    try {
      await axios.post(API_URL + "/videos/categories", { id, categories: selectedCategories })
      showSnackbar("Categories saved successfully!", "success");

    } catch (error) {
      showSnackbar(error.message, "error");
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

  const video = videos.find((video) => video._id === id);

  if (!video) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          Video not found
        </Typography>
      </Box>
    );
  }


  return (
    <Box display={"flex"} marginTop={"100px"}>
      <Box flex={8}>
        <VideoPlayer src={`http://localhost:3000/api/videos/play/${id}`} />
      </Box>
      <Box flex={4}>
        <Paper sx={{ minHeight: "100%", padding: "40px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>

          <Typography variant="h6">{video.name}</Typography>
          <LabelValue label="Bitrate" value={video.metadata?.bitrate + " kbps"} />
          <LabelValue label="Codec" value={video.metadata?.codec} />
          <LabelValue label="Duration" value={video.metadata?.duration + " seconds."} />
          <LabelValue label="Size" value={readableBytes(+video.metadata?.size)} />
          <LabelValue label="FPS" value={video.metadata?.fps} />
          <LabelValue label="Resolution" value={`${video.metadata?.height}x${video.metadata?.width}`} />
          <LabelValue label="Resolution" value={video.resolution} />
          <LabelValue label="Orientation" value={video.orientation} />
          <LabelValue label="Modified Date" value={video.metadata.modifiedDate} />
          <LabelValue label="Rate" value={video.rate} />
          <ChipSelect data={categories} selected={video.categories} onSave={handleSaveCategories} />
          {/* Botones con margin-top auto */}
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
  );
};


function readableBytes(bytes: number): string {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return bytes.toFixed(2) + " " + units[i];
}

export default VideoPage;