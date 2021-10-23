import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './mui';
import Navbar from './components/Navbar';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AuthContext from './context';
import './App.css';
import SignupRoutes from './components/signup/SignupRoutes';

function App() {
  // This is the entry into the app, so we have this bad boy making sure we import certain files
  // only when we're in the development mode
  const [loadedScripts, setLoadedScripts] = useState(false);
  if (!loadedScripts && process.env.NODE_ENV === 'development') {
    import('./random').then(() => setLoadedScripts(!loadedScripts));
  }

  const [authState, setAuthState] = useState({
    loggedIn: false,
    user: null,
  });

  return (
    <ThemeProvider theme={theme}>
      {/* This is used to make sure our CSS takes priority over Mui */}
      <StyledEngineProvider injectFirst>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <div className="app">
              <Navbar />
              <Switch>
                <PublicRoute path="/login">
                  <Login />
                </PublicRoute>

                <PublicRoute path="/signup">
                  <SignupRoutes />
                </PublicRoute>

                {/* /home is for logged in users */}
                <PrivateRoute path="/home">{window.largeLorem}</PrivateRoute>

                {/* empty / is for non-logged in users */}
                <Route exact path="/">
                  {authState.loggedIn ? <Redirect to="/home" /> : <>You are not logged in, this is the home page</>}
                </Route>
              </Switch>
            </div>
          </Router>
        </AuthContext.Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
