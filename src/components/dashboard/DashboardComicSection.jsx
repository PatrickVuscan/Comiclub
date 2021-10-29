import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DashboardComicCard from './DashboardComicCard';
import DashboardEpisodeCard from './DashboardEpisodeCard';
import DashboardAddEpisodeCard from './DashboardAddEpisodeCard';

const DashboardComicSection = () => {
  return (
    <Paper elevation={3} style={{ borderRadius: '10px' }}>
      <Stack spacing={1} m={3}>
        <Typography gutterBottom variant="h4" component="div">
          Comic Title Placeholder
        </Typography>
        <DashboardComicCard />
        <Typography gutterBottom variant="h5" component="div" pt={3}>
          Episode List
        </Typography>
        <Stack spacing={2}>
          <DashboardEpisodeCard />
          <DashboardEpisodeCard />
          <DashboardAddEpisodeCard />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DashboardComicSection;
