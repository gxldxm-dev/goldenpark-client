import { CircularProgress, Typography, Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import { useData } from "../hooks/useData";


export default function Category(){
    const id = useParams().id;
    const { categories, videos, loading, error} = useData()
    if (loading){
        return <CircularProgress />;
    }
    if (error){
        return <Typography color="error">{error}</Typography>;
    }
    const category = categories.find(c => c._id === id);
    if(!category){
        return <Typography color="error">Category not found</Typography>;
    }
    const fouundVideos =  videos.filter(video => video.categories.includes(id));
    return (
            <Box>
                <Typography variant="h4" color="white">{category.name}</Typography>
                <VideoGrid videos={fouundVideos}/>
            </Box>
    )
}