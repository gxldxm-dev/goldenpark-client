import  { useEffect, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';
import useTaskManager from "../hooks/useTaskManager"
import { DataSocket, ResponseSocket } from '../types';


const VideoUploader = ({ girlId }: { girlId?: string}) => {
  const { tasks, addTask, updateTask } = useTaskManager();
  
  const wsRef = useRef<WebSocket | null>(null);
  const updateTaskRef = useRef(updateTask);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => console.log('WebSocket conectado');
    ws.onmessage = (event) => {
      const data: ResponseSocket = JSON.parse(event.data);

      if (data.taskId && data.progress) {
        // Actualiza el progreso usando el taskId del WebSocket
        updateTaskRef.current(data.taskId, { progress: data.progress, status: data.status, message: data.message });
      }
    };

    ws.onclose = () => console.log('WebSocket desconectado');
    ws.onerror = (error) => console.error('Error en WebSocket:', error);

    wsRef.current = ws;
    return () => {
      ws.close();
    };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
  
    for (const file of files) {
      if (!file.type.startsWith('video/')) {
        alert(`El archivo "${file.name}" no es un video válido`);
        continue;
      }
  
      const tempId = file.name; // Usar el nombre del archivo como identificador temporal
  
      // Agregar tarea con estado inicial
      addTask({
        id: tempId,
        name: file.name,
        progress: 0,
        status: "Uploading",
        size: file.size,
      });
  
      const formData = new FormData();
      formData.append('video', file);
      formData.append('modifiedDate', new Date(file.lastModified).toISOString());
      if (girlId) formData.append('girl', girlId);
  
      try {
        const response = await axios.post<{ taskId: string }>(
          'http://localhost:3000/api/videos/create',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (event) => {
              if (event.total) {
                const progress = Math.round((event.loaded / event.total) * 100);
                updateTask(tempId, { progress });
              } else {
                console.warn('event.total no está definido');
              }
            },
          }
        );
  
        const taskId = response.data.taskId;
        // Actualizar ID temporal con el ID real y marcar como "En progreso"
        updateTask(tempId, { id: taskId });
        console.log(tasks)
        // Enviar taskId al WebSocket
        if (wsRef.current && taskId) {
          wsRef.current.send(JSON.stringify({ taskId }));
        }
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        updateTask(tempId, { status: 'Error', progress: 0 });
      }
    }
  };
  
  /* 
  handle taskmanager
  console.log(uploadStatus);

  */

  return (
    <Box sx={{ gap: 2,  display: "flex", width: "100%",alignItems: "center", justifyContent: "space-around"}}>
      <input
        type="file"
        accept="video/"
        multiple
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="upload-video"
      />
      <label htmlFor="upload-video">
        <Button
          variant="contained"
          color="primary"
          component="div"
          sx={{
            minWidth: 150, // Garantiza un ancho mínimo en lugar de fijo
            height: 48, // Altura consistente para el botón
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          startIcon={ <CloudUpload />}
        >
          Upload videos
        </Button>
      </label>
    </Box>
  );
};

export default VideoUploader;
