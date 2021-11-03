import './App.css';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import ComicsRoutes from './components/comics/ComicsRoutes';
import Dashboard from './components/dashboard/Dashboard';
import HomeLoggedIn from './components/home/HomeLoggedIn';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SignupRoutes from './components/signup/SignupRoutes';
import AuthContext, { fetchAuthState } from './context';
import theme from './mui';

function App() {
  // This is the entry into the app, so we have this bad boy making sure we
  // import certain files only when we're in the development mode
  const [loadedScripts, setLoadedScripts] = useState(false);
  if (!loadedScripts && process.env.NODE_ENV === 'development') {
    import('./random').then(() => setLoadedScripts(!loadedScripts));
  }

  const [authState, setAuthState] = useState(fetchAuthState());

  return (
    <ThemeProvider theme={theme}>
      {/* This is used to make sure our CSS takes priority over Mui */}
      <StyledEngineProvider injectFirst>
        <AuthContext.Provider value={{ authState, setAuthState, fetchAuthState }}>
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

                {/* empty / is for non-logged in users */}
                <PublicRoute exact path="/">
                  <>You are not logged in, this is the home page</>
                </PublicRoute>

                {/* /home is for logged in users */}
                <PrivateRoute path="/home">
                  <HomeLoggedIn />
                </PrivateRoute>

                <PrivateRoute path="/comics">
                  <ComicsRoutes />
                </PrivateRoute>

                <PrivateRoute path="/dashboard">
                  <Dashboard />
                </PrivateRoute>
              </Switch>
            </div>
          </Router>
        </AuthContext.Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
