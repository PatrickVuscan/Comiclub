import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';

import CreateEpisodeDialog from './CreateEpisodeDialog';
import DashboardEpisodesTable from './DashboardEpisodesTable';

const DashboardEpisodes = () => {
  const { comicID } = useParams();

  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Dashboard - Episodes for {comicID}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Artist Dashboard (Episodes), you can edit your Episodes!
          </Typography>
          <CreateEpisodeDialog comicID={comicID} />
        </Stack>
        <Stack spacing={4}>
          <DashboardEpisodesTable comicID={comicID} />
        </Stack>
      </Stack>
    </div>
  );
};

export default DashboardEpisodes;
