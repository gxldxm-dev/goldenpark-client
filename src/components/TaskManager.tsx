import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
  Fade,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
import useTaskManager from "../hooks/useTaskManager";
// const { tasks } = useTaskManager()

function bytesToHumanReadable(bytes) {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let unitIndex = 0;
  while (bytes > 1024 && unitIndex < units.length) {
    bytes /= 1024;
    unitIndex++;
  }
  return bytes.toFixed(2) + " " + units[unitIndex];
}

const TaskManager = () => {
  const { tasks } = useTaskManager();
  const [isOpen, setIsOpen] = useState(false);
  // tasks.filter((task) => task.status !== 'Completado');

 
  if (tasks.length === 0 && !isOpen) {
    return null; // No mostrar el botón si no hay tareas activas
  }

  return (
    <>
      {/* Botón flotante */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          borderRadius: "50%",
          width: 60,
          height: 60,
          minWidth: 0,
          zIndex: 1000,
        }}
      >
        {isOpen ? <CloseIcon /> : <UploadIcon />}
      </Button>

      {/* Panel de subidas */}
        <Fade in={isOpen} timeout={250}>
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: 100,
              right: 20,
              width: 400,
              overflowY: "auto",
              scrollbarWidth: "none",
              maxHeight: 800,
              borderRadius: 2,
              boxShadow: 4,
              padding: 2,
              zIndex: 999,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Tasks
            </Typography>

            {tasks.map((task) => (
              
              <Box>
              <Divider />

                <Box
                key={task.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                  padding: 1,
                  // border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                {/* Nombre del archivo */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" noWrap sx={{ maxWidth: "80%" }}>
                    {task.name.slice(0, 19)}... - {task.status}
                  </Typography>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>

                {/* Detalles del archivo */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {bytesToHumanReadable(task.size)}
                </Typography>

                {/* Barra de progreso */}
                <LinearProgress
                  variant="determinate"
                  value={task.progress}
                  sx={{
                    height: 7,
                    borderRadius: 5,
                  /*   "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        task.status === "uploading" ? "blue" : "green",
                    }, */
                  }}
                />

                {/* Estado */}
                <Typography
                  variant="body2"
                  color={task.status === "Completed" ? "green" : "white"}
                  sx={{ marginTop: 1, fontWeight: "bold" }}
                >
                  {task.status === "Completed"
                    ? "File uploaded successfully"
                    : `${task.progress}%`}
                </Typography>
              </Box>
              </Box>
            ))}
          </Paper>
        </Fade>
    </>
  );
};

export default TaskManager;
