import React, { useState } from "react";
import { Paper, Typography, Pagination, Box, Container, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Video } from "../types";
import { useSelection } from "../hooks/useSelection";
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import CollectionsIcon from '@mui/icons-material/Collections';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useData } from "../hooks/useData";

interface VideoGridItemProps {
  video: Video;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const VideoGridItem: React.FC<VideoGridItemProps> = React.memo(({ video, isSelected, onClick, onContextMenu }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        padding: 0,
        overflow: "hidden",
        aspectRatio: "16 / 9",
        backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
      onClick={(e) => onClick(e)}
      onContextMenu={onContextMenu}
      data-id={video._id}
    >
      <img
        src={`https://picsum.photos/seed/${video._id}/320/180`}
        alt={video.name}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
          padding: "16px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "white",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          {video.name}
        </Typography>
      </Box>
      {isSelected && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
            ✓
          </Typography>
        </Box>
      )}
    </Paper>
  );
});

const SelectionArea = styled("div")({
  position: "absolute",
  border: "2px solid #1976d2",
  backgroundColor: "rgba(25, 118, 210, 0.1)",
  pointerEvents: "none",
  zIndex: 1000,
});

const ITEMS_PER_PAGE = 9;

export default function VideoGrid(): JSX.Element {

  const { videos, loading, error} = useData();

  const {
    state,
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
    currentPage,
    handlePageChange,
    getSelectedItems,
  } = useSelection(videos.length, ITEMS_PER_PAGE);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null,
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, endIndex);

  if(loading) return <Typography>Loading...</Typography>;
  if(error) return <Typography color="error">{error}</Typography>;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "text.primary" }}>
        Video Gallery
      </Typography>
      <Box
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        sx={{ position: "relative", userSelect: "none", mb: 4 }}
      >
        <Grid container spacing={3}>
          {currentVideos.map((video) => (
            <Grid item key={video._id} xs={12} sm={6} md={4}>
              <VideoGridItem
                video={video}
                isSelected={state.selectedItems.has(video._id)}
                onClick={(e) => handleClick(video._id, e)}
                onContextMenu={handleContextMenu}
              />
            </Grid>
          ))}
        </Grid>
        {state.isDragging && (
          <SelectionArea
            style={{
              left: Math.min(state.startPoint.x, state.endPoint.x),
              top: Math.min(state.startPoint.y, state.endPoint.y),
              width: Math.abs(state.endPoint.x - state.startPoint.x),
              height: Math.abs(state.endPoint.y - state.startPoint.y),
            }}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(videos.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ '& .MuiPaginationItem-root': { fontSize: '1rem' } }}
        />
      </Box>
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => {
          console.log('Delete', getSelectedItems());
          handleCloseContextMenu();
        }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          console.log('Add to collection', getSelectedItems());
          handleCloseContextMenu();
        }}>
          <ListItemIcon>
            <CollectionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add to collection</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          console.log('Download', getSelectedItems());
          handleCloseContextMenu();
        }}>
          <ListItemIcon>
            <GetAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
}

