import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SignupContext from './SignupContext';
import styles from './SignupSuggestions.module.css';

const SignupSuggestions = () => {
  const {
    signupState: { name, favourites },
    setSignupState,
  } = useContext(SignupContext);

  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.suggestions}>
        {`Hi ${name}!`}
        What're your favourite types of comics?
      </div>
    </div>
  );
};

export default SignupSuggestions;
