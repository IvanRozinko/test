import React, { useState } from 'react';
import {Button} from "react-bootstrap";

const Player = ({trackUrl}) => {
  const [playing, setPlaying] = useState(false);
  const [track] = useState(new Audio(trackUrl));

  const playSong = () => {
    track.play();
    setPlaying(true);
  };
  const pauseSong = () => {
    track.pause();
    setPlaying(false);
  };

  return (
    <Button
      onClick={playing ? pauseSong : playSong}
      variant="warning"
    >
      {playing ? 'stop' : 'play'}
    </Button>
  );
};

export default Player;
