import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import DashboardEpisodesTable from './DashboardEpisodesTable';

const DashboardEpisodes = () => {
  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Dashboard - Episodes for Comic A!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Artist Dashboard (Episodes), you can edit your Episodes!
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <DashboardEpisodesTable />
        </Stack>
      </Stack>
    </div>
  );
};

export default DashboardEpisodes;
