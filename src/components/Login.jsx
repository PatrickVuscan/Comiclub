import { useState, useContext } from 'react';
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
import styles from './Login.module.css';
import AuthContext from '../context';

const acceptedUsersAndPasswords = {
  user: 'user',
  admin: 'admin',
};

const Login = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  if (authState.loggedIn) {
    history.push('/');
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const submit = (e) => {
    e.preventDefault();

    // Make some call to backend here!
    // foo(username, password) etc

    if (acceptedUsersAndPasswords[username] && acceptedUsersAndPasswords[username] === password) {
      setAuthState({
        loggedIn: true,
        user: username, // Might need to replace eventually with a userID
      });
      history.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <TextField
          className={styles.input}
          id="login-username"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <FormControl className={styles.input}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            label="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="outlined" color="primary" size="large" className={styles.input} onClick={submit}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;
