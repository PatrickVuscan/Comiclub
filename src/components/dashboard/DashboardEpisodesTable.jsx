import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';

import { getEpisodesByComicID } from '../../actions/ArtistDashboardActions';
import DeleteDialog from '../DeleteDialog';

class DashboardEpisodesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
    };
  }

  componentDidMount() {
    // When the component enters the DOM
    getEpisodesByComicID(this);
  }

  render() {
    const { episodes } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox color="primary" />
              </TableCell>
              <TableCell align="right">Number</TableCell>
              <TableCell>Episode</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Published</TableCell>
              <TableCell align="right">Panels Uploaded</TableCell>
              <TableCell align="right">Views</TableCell>
              <TableCell align="right">Likes</TableCell>
              <TableCell align="right">Comments</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes.map((episode) => (
              <TableRow key={episode.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell align="right">{episode.number}</TableCell>
                <TableCell align="right">
                  <Box component="img" src={episode.thumb} sx={{ width: 200 }} />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Stack>
                    <Typography gutterBottom variant="h7" color="text.primary" component="div">
                      Episode {episode.number} - {episode.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      {episode.description}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">{episode.publishDate}</TableCell>
                <TableCell align="right">{episode.panelCount}</TableCell>
                <TableCell align="right">{episode.viewCount}</TableCell>
                <TableCell align="right">{episode.likeCount}</TableCell>
                <TableCell align="right">{episode.commentCount}</TableCell>
                <TableCell align="right">
                  <DeleteDialog />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default DashboardEpisodesTable;
