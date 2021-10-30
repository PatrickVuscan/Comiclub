import React from 'react';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

import episodeCoverImg from '../../assets/episodeCover.png';

function fetchEpisodeFromDB(comicId, episodeID) {
  return {
    number: 1,
    title: 'The Title of the Episode',
    cover: episodeCoverImg,
    publishDate: '09/09/09',
    panelCount: 10,
    views: 100364,
    likes: 42124,
    comments: 2341,
    description: window.smallLorem,
  };
}

const DashboardEpisodeCard = () => {
  const { number, title, cover, publishDate, panelCount, views, likes, comments, description } = fetchEpisodeFromDB(
    null,
    null
  );

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{ height: 200, width: 300 }} image={cover} alt="placeholder" />
      <CardContent sx={{ width: '50%' }}>
        <Typography gutterBottom variant="h5" component="div">
          Episode {number} - {title}.
        </Typography>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ m: 2, minWidth: 100 }}>
        <Typography gutterBottom variant="h7" color="text.primary" component="div">
          Statistics.
        </Typography>
        <Stack spacing={0.25}>
          <Typography variant="body2" color="text.secondary" component="div">
            Published: {publishDate}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Panels: {panelCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Views: {views}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Likes: {likes}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Comments: {comments}
          </Typography>
        </Stack>
      </Box>

      <CardActions>
        <Tooltip title="View">
          <VisibilityIcon />
        </Tooltip>
        <Tooltip title="Edit">
          <CreateIcon />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default DashboardEpisodeCard;
