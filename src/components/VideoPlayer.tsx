import React, { useRef, useState } from 'react';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  Speed,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  Slider,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';

const VideoPlayer = ({src}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (_, value) => {
    setVolume(value);
    videoRef.current.volume = value / 100;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSpeedMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
    setAnchorEl(null);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSliderChange = (_, value) => {
    videoRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Box sx={{ width: '90%',  backgroundColor: "#121111", borderRadius: "10px", padding: "0 20px 20px 20px"}}>
      <video
        ref={videoRef}
        src={src}
        width="100%"
        style={{ maxHeight: 480 }}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onTimeUpdate={handleTimeUpdate}
      />
      <Divider sx={{ color: "white"}}/>
      <Grid container alignItems="center" spacing={2} sx={{ mt: 2 }}>
        {/* Play/Pause */}
        <Grid item>
          <IconButton onClick={togglePlay} sx={{ color: "white" }}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Grid>

        {/* Volume */}
        <Grid item>
            {/*       <Slider
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            min={0}
            max={100}
          /> */}
          <IconButton onClick={toggleMute} sx={{ color: "white" }}>
            {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
          </IconButton>

        </Grid>
        <Grid item xs>
          
        </Grid>

        {/* Timeline Slider */}
        <Grid item sx={{ display: "flex", flex: 12}}>
          <Slider
            value={currentTime}
            onChange={handleSliderChange}
            min={0}
            max={duration}
            step={1}
            sx={{ color: "#FF4191"  }}
          />
          <Typography variant="caption" align="right" color='white'>
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </Typography>
        </Grid>

        {/* Speed Menu */}
        <Grid item>
          <IconButton onClick={handleSpeedMenuOpen} sx={{ color: "white" }}>
            <Speed />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {[0.5, 1, 1.5, 2].map((rate) => (
              <MenuItem
                key={rate}
                onClick={() => handleSpeedChange(rate)}
                selected={playbackRate === rate}
              >
                {rate}x
              </MenuItem>
            ))}
          </Menu>
        </Grid>

        {/* Fullscreen */}
        <Grid item>
          <IconButton onClick={toggleFullscreen} sx={{ color: "white" }}> 
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoPlayer;
