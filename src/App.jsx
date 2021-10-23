import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './mui';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AuthContext from './context';

function App() {
  // This is the entry into the app, so we have this bad boy making sure we import certain files
  // only when we're in the development mode
  const [loadedScripts, setLoadedScripts] = useState(false);
  if (process.env.NODE_ENV === 'development') {
    import('./random').then(() => setLoadedScripts(true));
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
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">{window.largeLorem}</Route>
                <Route path="/">You are on the home page</Route>
              </Switch>
            </div>
          </Router>
        </AuthContext.Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
