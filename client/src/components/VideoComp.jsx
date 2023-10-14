import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: '0 10px', // Add some margin to separate the cards
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center', // Align cards towards the end
    flexWrap: 'wrap', // Allow cards to wrap to the next row
    gap: '20px', // Add gap between cards
    padding: '20px', // Add padding to the container
  },
});

const VideoComp = ({ videoData }) => {
  const classes = useStyles();

  const handleCardClick = (videoId) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className={classes.cardContainer}>
      {videoData.map((video) => (
        <Card key={video.id} className={classes.card} onClick={() => handleCardClick(video.youtubeVideoId)}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={video.title}
              height="200"
              image={video.previewImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default VideoComp;
