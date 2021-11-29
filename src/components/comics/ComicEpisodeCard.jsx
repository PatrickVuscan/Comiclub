import DashboardEpisodeCard from './DashboardEpisodeCard';

const ComicEpisodeCard = ({ episode }) => {
  console.log(episode);
  return (
    <div style={{ marginBottom: '2vh' }}>
      <DashboardEpisodeCard />
    </div>
  );
};

export default ComicEpisodeCard;
