import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Button, Typography } from "@mui/material";
import { useData } from "../hooks/useData";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import NotFound from "../components/NotFound";
import AsyncStatusHandler from "../components/AsyncStatusHandler";
import LabelValue from "../components/LabelValue";
import { api, API_URL } from "../services/api";
import Grid from "@mui/material/Grid2";
import Card from "../components/card";
import ImageSkeleton from "../components/ImageSkeleton";

export default function StudioPage() {
  const navigate = useNavigate();
  const showSnackbar = useShowSnackbar();
  const { studios, girls, loading, error } = useData()
  const { id } = useParams<{ id: string }>();


  if (loading) {
    return <AsyncStatusHandler loading={loading} error={error} />;
  }

  if (error) {
    return <AsyncStatusHandler loading={false} error={error} />;
  }

  async function handleDelete() {
    try {
      await api.studios.delete(id)
      navigate("/studios");
      showSnackbar("Video deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting video; error: " + error.message, "error");
    }
  }

  const studio = studios.find((studio) => studio._id === id);
  const matchedGirls = girls.filter((girl) => girl.studio === id);
  if (!studio) return <NotFound />;


  return (
    <Box>
      <Box display={"flex"} >
        <Box flex={4}>
          <ImageSkeleton src={API_URL + "/images/cover/" + studio._id} height={300}/>
        </Box>
        <Box flex={8}>
          <Paper sx={{ minHeight: "100%", padding: "40px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            <Typography variant="h4">
              {studio.name}
            </Typography>
            <LabelValue label="Status" value={studio.status} />
            <LabelValue label="Hisotry" value={studio.history} />
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
      <Typography variant="h4" component="h1" gutterBottom>
            Girls
          </Typography>

      <Grid container spacing={3}>
        {matchedGirls.map((girl) => (
          <Grid size={3}>
            <Card item={girl} endpoint={API_URL + "/girls"} to={`/girl/${girl._id}`} imageHeight={400} />
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};

