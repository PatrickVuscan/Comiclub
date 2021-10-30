import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const DashboardAddEpisodeCard = () => {
  return (
    <Card
      style={{
        height: 140,
        backgroundColor: 'lightblue',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <AddCircleIcon /> ADD A NEW EPISODE
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardAddEpisodeCard;
