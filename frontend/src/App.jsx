import './App.css';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import AdminRoutes from './components/admin/AdminRoutes';
import ComicsRoutes from './components/comics/ComicsRoutes';
import DashboardRoutes from './components/dashboard/DashboardRoutes';
import Favourites from './components/favourites/Favourites';
import Footer from './components/Footer';
import Genres from './components/genres/Genres';
import HomeLoggedIn from './components/home/HomeLoggedIn';
import HomeNotLoggedIn from './components/home/HomeNotLoggedIn';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Popular from './components/popular/Popular';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SignupRoutes from './components/signup/SignupRoutes';
import AuthContext, { fetchAuthState } from './context';
import theme from './mui';

function App() {
  const [authState, setAuthState] = useState(fetchAuthState());

  return (
    <ThemeProvider theme={theme}>
      {/* This is used to make sure our CSS takes priority over Mui */}
      <StyledEngineProvider injectFirst>
        <AuthContext.Provider value={{ authState, setAuthState, fetchAuthState }}>
          <Router>
            <div className="app">
              <Navbar />
              <div className="app-body">
                <Switch>
                  <PublicRoute path="/login">
                    <Login />
                  </PublicRoute>

                  <PublicRoute path="/signup">
                    <SignupRoutes />
                  </PublicRoute>

                  {/* empty / is for non-logged in users */}
                  <PublicRoute exact path="/">
                    <HomeNotLoggedIn />
                  </PublicRoute>

                  {/* /home is for logged in users */}
                  <PrivateRoute path="/home">
                    <HomeLoggedIn />
                  </PrivateRoute>

                  <PrivateRoute path="/comics">
                    <ComicsRoutes />
                  </PrivateRoute>

                  <PrivateRoute path="/dashboard">
                    <DashboardRoutes />
                  </PrivateRoute>

                  <PrivateRoute path="/admin">
                    <AdminRoutes />
                  </PrivateRoute>

                  <PrivateRoute path="/genres">
                    <Genres />
                  </PrivateRoute>

                  <PrivateRoute path="/popular">
                    <Popular />
                  </PrivateRoute>

                  <PrivateRoute path="/favourites">
                    <Favourites />
                  </PrivateRoute>

                  {/* I believe this acts as a redirect for all paths that do not match the above,
                      back to home, so that we don't show empty paths, empty screens. */}
                  <Redirect to="/home" />
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </AuthContext.Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
