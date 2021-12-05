import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { uid } from 'react-uid';

import { getEpisodesByComic } from '../../actions/DashboardActions';
import DashboardEpisodesRow from './DashboardEpisodesRow';

class DashboardEpisodesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      comicID: props.comicID,
      episodes: [],
    };
  }

  componentDidMount() {
    // When the component enters the DOM
    // get all episodes
    getEpisodesByComic(this);
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.updates !== this.props.updates) {
      getEpisodesByComic(this);
    }
  }

  refreshEpisodes() {
    getEpisodesByComic(this);
  }

  render() {
    const { episodes } = this.state;

    if (!episodes.length) {
      return <Typography>You currently have no episodes for this comic.</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{/* <Checkbox color="primary" /> */}</TableCell>
              {/* <TableCell align="right">Number</TableCell> */}
              <TableCell align="left">Episode</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Published</TableCell>
              <TableCell align="right">Panels</TableCell>
              <TableCell align="right">Views</TableCell>
              <TableCell align="right">Comments</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes.map((episode) => (
              <DashboardEpisodesRow
                key={uid(episode)}
                episode={episode}
                // eslint-disable-next-line react/jsx-no-bind
                refreshEpisodes={this.refreshEpisodes.bind(this)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default DashboardEpisodesTable;
