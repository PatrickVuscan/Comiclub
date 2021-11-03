import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import DashboardAddEpisodeCard from './DashboardAddEpisodeCard';
import DashboardComicCard from './DashboardComicCard';
import DashboardEpisodeCard from './DashboardEpisodeCard';

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
