import { useContext, useState } from 'react';
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
import styles from './SignupDetails.module.css';

const existingUsers = {
  user: 'user',
  admin: 'admin',
};

const SignupDetails = () => {
  const {
    signupState: { name, username, password },
    setSignupState,
  } = useContext(SignupContext);
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

    if (existingUsers[username]) {
      // Tell them the username is taken
      console.log('Username is taken!');
    } else {
      history.push('/signup/suggestions');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <TextField
          className={styles.input}
          id="name"
          label="Name"
          value={name}
          onChange={(e) => {
            setSignupState((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
        />
        <TextField
          className={styles.input}
          id="username"
          label="Username"
          value={username}
          onChange={(e) => {
            setSignupState((prevState) => ({
              ...prevState,
              username: e.target.value,
            }));
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
              setSignupState((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
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
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignupDetails;
