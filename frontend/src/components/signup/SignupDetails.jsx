import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ENV from '../../config';
import SignupContext from './SignupContext';
import styles from './SignupDetails.module.css';

const existingUsers = {
  user: 'user',
  admin: 'admin',
};

const SignupDetails = () => {
  const {
    signupState: { name, email, password },
    setSignupState,
  } = useContext(SignupContext);
  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const submit = (e) => {
    e.preventDefault();

    const request = new Request(`${ENV.api_host}/api/users/check-credentials`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    // Send the request with fetch()
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json.available) {
          history.push('/signup/suggestions');
        } else {
          setDisplayError(json.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
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
            marginBottom: '2rem',
          }}
        >
          {'Welcome to Comiclub!\nCreate an Account to get started!'}
        </p>
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
          id="email"
          label="Email"
          value={email}
          onChange={(e) => {
            if (displayError) setDisplayError(false);
            setSignupState((prevState) => ({
              ...prevState,
              email: e.target.value,
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
              if (displayError) setDisplayError(false);
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
        {displayError && (
          <p
            style={{
              fontSize: '14px',
              color: 'red',
              fontWeight: 'bold',
              margin: '0',
              textAlign: 'center',
              // These following things are used for it to ensure that the \n is converted into an actual newline
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {`Unfortunately there is an issue.\n${displayError}`}
          </p>
        )}
        <Link to="/login" className={styles.hoverable}>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--blue)',
              fontWeight: 'bold',
              margin: '1rem 0 0 0',
              textAlign: 'center',
              // These following things are used for it to ensure that the \n is converted into an actual newline
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {'Already have an account?\nLog In instead!'}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignupDetails;
