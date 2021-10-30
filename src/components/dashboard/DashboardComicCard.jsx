import React from 'react';
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
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import comicCoverImg from '../../assets/comicCover.jpg';

function fetchComicFromDB(comicId) {
  return {
    title: 'Comic Title Placeholder',
    cover: comicCoverImg,
    publishDate: '09/09/09',
    updateDate: '12/12/12',
    episodeCount: 10,
    viewCount: 100364,
    likeCount: 42124,
    commentCount: 2341,
    description: window.smallLorem,
  };
}
const DashboardComicCard = () => {
  const { title, cover, publishDate, updateDate, episodeCount, viewCount, likeCount, commentCount, description } =
    fetchComicFromDB(null, null);
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{ height: 200, width: 300 }} image={cover} alt="placeholder" />
      <CardContent sx={{ width: '50%' }}>
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
            Updated: {updateDate}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Episodes: {episodeCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Views: {viewCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Likes: {likeCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Comments: {commentCount}
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

export default DashboardComicCard;
