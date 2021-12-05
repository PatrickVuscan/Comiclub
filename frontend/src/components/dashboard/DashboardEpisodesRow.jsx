import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';

import DeleteEpisode from './DeleteEpisode';
import EditEpisode from './EditEpisode';

// eslint-disable-next-line react/prefer-stateless-function
const DashboardEpisodesRow = ({ episode, refreshEpisodes }) => {
  const { id, name, description, thumb, publishDate, panels, viewCount, comments } = episode;

  return (
    <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Checkbox color="primary" />
      </TableCell>
      {/* <TableCell align="right">{number}</TableCell> */}
      <a href={panels}>
        <TableCell align="right" style={{ cursor: 'pointer' }}>
          {thumb ? (
            <Box component="img" src={thumb} sx={{ width: 200 }} />
          ) : (
            <Box sx={{ width: 200 }}>
              <Typography style={{ textAlign: 'center' }}>No Thumbnail</Typography>
            </Box>
          )}
        </TableCell>
      </a>
      <TableCell component="th" scope="row">
        <Stack>
          <Typography gutterBottom variant="h6" color="text.primary" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {description}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">{publishDate}</TableCell>
      <TableCell align="right">
        <a href={panels} style={{ color: 'blue', textDecoration: 'underline' }}>
          View
        </a>
      </TableCell>
      <TableCell align="right">{viewCount}</TableCell>
      <TableCell align="right">{comments.length}</TableCell>
      <TableCell align="right">
        <EditEpisode episode={episode} refreshEpisodes={refreshEpisodes} />
        <DeleteEpisode episodeID={id} episodeName={name} />
      </TableCell>
    </TableRow>
  );
};

export default DashboardEpisodesRow;
