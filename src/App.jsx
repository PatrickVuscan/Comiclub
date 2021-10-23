import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useState } from 'react';
import Navbar from './components/Navbar';
import theme from './mui';
import Login from './components/Login';

function App() {
  // This is the entry into the app, so we have this bad boy making sure we import certain files
  // only when we're in the development mode
  const [loadedScripts, setLoadedScripts] = useState(false);
  if (process.env.NODE_ENV === 'development') {
    import('./random').then(() => setLoadedScripts(true));
  }

  return (
    <ThemeProvider theme={theme}>
      {/* This is used to make sure our CSS takes priority over Mui */}
      <StyledEngineProvider injectFirst>
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
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
