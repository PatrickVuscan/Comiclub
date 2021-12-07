import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { GetTopComics } from '../../actions/HomeLoggedInActions';
import styles from './Popular.module.css';

const Popular = () => {
  const history = useHistory();

  const [comics, setComics] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const topComics = await GetTopComics();
      console.log('Get All comics', topComics);
      setComics(topComics);
    };

    fetchData();
  }, []);

  const submit = (comicID) => (e) => {
    e.preventDefault();

    history.push(`/comics/${comicID}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subscriptions}>
        <p
          style={{
            fontSize: '20px',
            color: 'var(--blue)',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'center',
            // These following things are used for it to ensure that the \n is converted into an actual newline
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          Here are our most popular comics!
        </p>

        <List dense sx={{ maxWidth: 600, bgcolor: 'background.paper' }}>
          {comics.map((comic, index) => {
            return (
              <ListItem key={comic._id} disablePadding>
                <ListItemButton onClick={submit(comic._id)}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 70, height: 70 }} alt={`${comic.name}`} src={`${comic.thumbImage?.imageURL}`}>
                      <Avatar sx={{ width: 70, height: 70 }} alt={`${comic.name}`} src="/imageNotFound.webp" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ marginLeft: '1rem' }}
                    primaryTypographyProps={{ variant: 'h6' }}
                    primary={`${index + 1} - ${comic.name}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Popular;
