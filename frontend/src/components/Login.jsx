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
import { Link, useHistory } from 'react-router-dom';

import ENV from '../config';
import AuthContext from '../context';
import styles from './Login.module.css';

const Login = () => {
  const { setAuthState, fetchAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    const request = new Request(`${ENV.api_host}/api/users/login`, {
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
        if (json.currentUser !== undefined) {
          localStorage.setItem('LOGGED_IN_USERNAME', email);
          setAuthState(fetchAuthState());
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        setDisplayError(true);
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
          To continue, please Log In!
        </p>
        <TextField
          className={styles.input}
          id="email"
          label="Email"
          value={email}
          onChange={(e) => {
            if (displayError) setDisplayError(false);
            setEmail(e.target.value);
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
            {`There was an issue logging in\nPlease check your credentials!`}
          </p>
        )}
        <Link to="/signup" className={styles.hoverable}>
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
            {"Don't have an account?\nSign Up!"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
