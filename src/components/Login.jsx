import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../context';
import styles from './Login.module.css';

const acceptedUsersAndPasswords = {
  user: 'user',
  admin: 'admin',
};

const Login = () => {
  const { setAuthState, fetchAuthState } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

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
      localStorage.setItem('LOGGED_IN_USERNAME', username);
      setAuthState(fetchAuthState());
      // TO LOG OUT:
      // localStorage.removeItem('LOGGED_IN_USERNAME');
      // setAuthState(fetchAuthState());
      history.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <TextField
          className={styles.input}
          id="username"
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
