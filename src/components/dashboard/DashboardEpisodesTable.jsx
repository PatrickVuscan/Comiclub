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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

import comicCoverImg from '../../assets/episodeCover.png';
import DeleteDialog from '../DeleteDialog';

function createEpisodeData(
  name,
  description,
  thumb,
  publishDate,
  number,
  panelCount,
  viewCount,
  likeCount,
  commentCount
) {
  return {
    name,
    description,
    thumb,
    publishDate,
    number,
    panelCount,
    viewCount,
    likeCount,
    commentCount,
  };
}

// TODO: replace with server calls
function getEpisodesByComicID(comicID) {
  console.log(comicID);

  const placeholderDescription =
    'Comics is a medium used to express ideas with images, often combined with text or other visual information. It typically takes the form of a sequence of panels of images. Textual devices such as speech balloons, captions, and onomatopoeia can indicate dialogue, narration, sound effects, or other information.';

  const episodes = [
    createEpisodeData('Episode Title E', placeholderDescription, comicCoverImg, '01/01/01', 5, 12, 123, 798, 83),
    createEpisodeData('Episode Title D', placeholderDescription, comicCoverImg, '02/02/02', 4, 872, 21, 107, 82),
    createEpisodeData('Episode Title C', placeholderDescription, comicCoverImg, '03/03/03', 3, 12, 123, 798, 83),
    createEpisodeData('Episode Title B', placeholderDescription, comicCoverImg, '04/04/04', 2, 872, 21, 107, 82),
    createEpisodeData('Episode Title A', placeholderDescription, comicCoverImg, '05/05/05', 1, 12, 123, 798, 83),
  ];

  return episodes;
}

const ComicTable = () => {
  const episodesByComic = getEpisodesByComicID(null);

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
          {episodesByComic.map((episode) => (
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
};

export default ComicTable;
