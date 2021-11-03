import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import DashboardComicSection from './DashboardComicSection';

const Dashboard = () => {
  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Welcome to your Dashboard, Artist User!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Artist Dashboard, you can edit and add Comics and upload your latest Episodes!
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <DashboardComicSection />
          <DashboardComicSection />
          <DashboardComicSection />
        </Stack>
      </Stack>
    </div>
  );
};

export default Dashboard;
