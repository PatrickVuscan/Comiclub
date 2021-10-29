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
import Stack from '@mui/material/Stack';

import episodeCoverImg from '../../assets/episodeCover.png';

const DashboardEpisodeCard = () => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{ height: 200, width: 300 }} image={episodeCoverImg} alt="placeholder" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Episode XX - The Title of the Episode.
        </Typography>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ width: 600 }}>
            This is the description for Comic Abby Episode #1. It is a good comic with many images and many texts. Our
            protagonist is Abby, and her friend is Bobby.
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="h7" color="text.primary" component="div">
          Statistics.
        </Typography>
        <Stack spacing={0.25}>
          <Typography variant="body2" color="text.secondary" component="div">
            Published: 09/09/09
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Panels: 10
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Views: 1000
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Likes: 1000
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Comments: 100
          </Typography>
        </Stack>
      </Box>
      <CardActions>
        <VisibilityIcon />
        <CreateIcon />
        <DeleteIcon />
      </CardActions>
    </Card>
  );
};

export default DashboardEpisodeCard;
