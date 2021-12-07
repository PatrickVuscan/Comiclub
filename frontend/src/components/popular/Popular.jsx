import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../context';
import aotImage from '../home/images/aot.png';
import batmanImage from '../home/images/batman.png';
import gohImage from '../home/images/goh.png';
import ironmanImage from '../home/images/ironman.png';
import marvelImage from '../home/images/marvel.png';
import narutoImage from '../home/images/naruto.png';
import opImage from '../home/images/op.png';
import togImage from '../home/images/tog.png';
import styles from './Popular.module.css';

const Popular = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();

    // Find image name and redirect accordingly
    console.log(e);
    const path = comicId[e.target.key];
    history.push(path);
  };
  const comicId = {
    1: '/comics/batman',
    2: '/comics/op',
    3: '/comics/naruto',
    4: '/comics/aot',
    5: '/comics/tog',
    6: '/comics/marvel',
    7: '/comics/ironman1',
    8: '/comics/goh',
  };
  const itemData = [
    {
      img: batmanImage,
      title: 'Batman Origins',
      ranking: 1,
    },
    {
      img: opImage,
      title: 'One Piece',
      ranking: 2,
    },
    {
      img: narutoImage,
      title: 'Naruto ',
      ranking: 3,
    },
    {
      img: aotImage,
      title: 'Attack on Titan',
      ranking: 4,
    },
    {
      img: togImage,
      title: 'Tower of God',
      ranking: 5,
    },
    {
      img: marvelImage,
      title: 'Marvel ',
      ranking: 6,
    },
    {
      img: ironmanImage,
      title: 'Iron Man: The First Edition',
      ranking: 7,
    },
    {
      img: gohImage,
      title: 'God of High School',
      ranking: 8,
    },
  ];

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

        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {itemData.map((item) => {
            return (
              <ListItem key={item.ranking} disablePadding>
                <ListItemButton onClick={submit}>
                  <ListItemAvatar>
                    <Avatar alt={`${item.title}`} src={`${item.img}`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${item.ranking} - ${item.title}`} />
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
