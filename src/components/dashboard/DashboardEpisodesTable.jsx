import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { uid } from 'react-uid';

import { getEpisodesByComic } from '../../actions/ArtistDashboardActions';
import DashboardEpisodesRow from './DashboardEpisodesRow';

class DashboardEpisodesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
    };
  }

  componentDidMount() {
    // When the component enters the DOM
    // get all episodes
    getEpisodesByComic(this);
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
              <TableCell align="left">Episode</TableCell>
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
              <DashboardEpisodesRow key={uid(episode)} episode={episode} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default DashboardEpisodesTable;
