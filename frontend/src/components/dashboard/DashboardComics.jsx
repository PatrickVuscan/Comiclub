import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import CreateComicsDialog from './CreateComicsDialog';
import DashboardComicsTable from './DashboardComicsTable';

const DashboardComics = () => {
  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Dashboard - Comics for Artist User!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Artist Dashboard, you can edit your Comics!
          </Typography>
          <CreateComicsDialog />
        </Stack>
        <Stack spacing={4}>
          <DashboardComicsTable />
        </Stack>
      </Stack>
    </div>
  );
};

export default DashboardComics;
