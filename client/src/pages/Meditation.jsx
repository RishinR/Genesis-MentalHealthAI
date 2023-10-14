import React, { useState, useEffect } from 'react';
import { Button, Slider, Typography } from '@mui/material';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../assets/music.mp3';
import axios from 'axios';
import Timermain from '../components/timer/Timermain';
const Meditation = () => {

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4">Meditation Timer</Typography>
      </div>
      <Timermain/>
    </div>
  );
};

export default Meditation;
