import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import DashboardComicCard from './DashboardComicCard';
import DashboardEpisodeCard from './DashboardEpisodeCard';
import DashboardAddEpisodeCard from './DashboardAddEpisodeCard';
import episodeCoverImg from '../../assets/episodeCover.png';

const Dashboard = () => {
  return (
    <div>
      <Box m={10} pt={3}>
        <Stack spacing={2}>
          <Typography gutterBottom variant="h3" component="div">
            Welcome to your Dashboard, ArtistUser!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the Artist Dashboard, you can edit and add Comics and upload your latest Episodes!
          </Typography>
          <Divider />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <DashboardComicCard />
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                <Typography gutterBottom variant="h5" component="div">
                  Episode List
                </Typography>
                <DashboardEpisodeCard />
                <DashboardEpisodeCard />
                <DashboardAddEpisodeCard />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <DashboardComicCard />
            </AccordionSummary>
            <AccordionDetails>
              <DashboardEpisodeCard />
              <DashboardEpisodeCard />
              <DashboardAddEpisodeCard />
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </div>
  );
};

export default Dashboard;
