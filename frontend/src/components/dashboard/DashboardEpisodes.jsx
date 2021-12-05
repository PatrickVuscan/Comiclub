import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';

import { getComic } from '../../actions/DashboardActions';
import CreateEpisodeDialog from './CreateEpisodeDialog';
import DashboardEpisodesTable from './DashboardEpisodesTable';

const DashboardEpisodes = () => {
  const [updates, setUpdates] = React.useState(0);

  const update = () => {
    setUpdates((prevCount) => prevCount + 1);
  };

  const { comicID } = useParams();

  const [comic, setComic] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const comicResponse = await getComic(comicID);
      setComic(comicResponse);
    };

    fetchData();
  }, [comicID]);

  return (
    <div>
      <Stack spacing={5} m={10} pt={3} sx={{ minWidth: 800 }}>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h3" component="div">
            Dashboard - Episodes for {comic.name}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Artist Dashboard (Episodes), you can edit your Episodes!
          </Typography>
          <CreateEpisodeDialog comicID={comicID} update={update} />
        </Stack>
        <Stack spacing={4}>
          <DashboardEpisodesTable comicID={comicID} updates={updates} />
        </Stack>
      </Stack>
    </div>
  );
};

export default DashboardEpisodes;
