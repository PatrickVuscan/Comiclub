import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';

const ComicEpisodeCard = ({ episode, number }) => {
  const { name, thumbImage, description } = episode;
  const { imageURL: cover } = thumbImage || {};

  return (
    <Card sx={{ display: 'flex' }}>
      {cover && <CardMedia component="img" sx={{ height: 200, width: 300 }} image={cover} alt="placeholder" />}
      <CardContent sx={{ width: '100%' }}>
        <Typography gutterBottom variant="h5" component="div">
          Episode {number} - {name}.
        </Typography>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComicEpisodeCard;
