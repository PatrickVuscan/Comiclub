import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { uid } from 'react-uid';

import { getComicsByUser } from '../../actions/DashboardActions';
import DashboardComicsRow from './DashboardComicsRow';

class DashboardComicsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comics: [],
    };
  }

  componentDidMount() {
    // When the component enters the DOM
    // get all comics
    getComicsByUser(this);
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.updates !== this.props.updates) {
      getComicsByUser(this);
    }
  }

  refreshComics() {
    getComicsByUser(this);
  }

  render() {
    const { comics } = this.state;

    if (!comics.length) {
      return <Typography>You currently have no comics.</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {/*
                This one should not be enabled
                <Checkbox color="primary" />
                */}
              </TableCell>
              <TableCell>Comic</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Published</TableCell>
              <TableCell align="right">Episodes Uploaded</TableCell>
              {/* <TableCell align="right">Panels Uploaded</TableCell> */}
              <TableCell align="right">Views</TableCell>
              <TableCell align="right">Likes</TableCell>
              {/* <TableCell align="right">Comments</TableCell> */}
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comics.map((comic) => (
              // eslint-disable-next-line react/jsx-no-bind
              <DashboardComicsRow key={uid(comic)} comic={comic} refreshComics={this.refreshComics.bind(this)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default DashboardComicsTable;
