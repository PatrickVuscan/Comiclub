import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';

import DeleteComic from './DeleteComic';

// eslint-disable-next-line react/prefer-stateless-function
const DashboardComicsRow = ({ comic }) => {
  const { id, name, description, thumb, publishDate, episodeCount, panelCount, viewCount, likeCount, commentCount } =
    comic;

  const history = useHistory();

  const goToEpisode = (e) => {
    e.preventDefault();
    const path = `dashboard/${e.target.alt}`;
    history.push(path);
  };

  return (
    <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Checkbox color="primary" />
      </TableCell>
      <TableCell align="right" onClick={goToEpisode}>
        <Box component="img" src={thumb} sx={{ width: 200 }} alt={id} />
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack>
          <Typography gutterBottom variant="h7" color="text.primary" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {description}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">{publishDate}</TableCell>
      <TableCell align="right">{episodeCount}</TableCell>
      <TableCell align="right">{panelCount}</TableCell>
      <TableCell align="right">{viewCount}</TableCell>
      <TableCell align="right">{likeCount}</TableCell>
      <TableCell align="right">{commentCount}</TableCell>
      <TableCell align="right">
        <DeleteComic comicID={id} comicName={name} />
      </TableCell>
    </TableRow>
  );
};

export default DashboardComicsRow;