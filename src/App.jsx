import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import Navbar from './components/Navbar';
import theme from './mui';
import AuthContext from './context';

// This is the entry into the app, so we have this bad boy making sure we import certain files
// only when we're in the development mode
if (process.env.NODE_ENV === 'development') {
  import('./random').then(() => console.log('loaded in random'));
}

function App() {
  console.log(process.env);

  const [authState, setAuthState] = useState({
    loggedIn: false,
    user: null,
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="app">
            <Navbar />
            <Switch>
              <Route path="/abc">{window.largeLorem}</Route>
              <Route path="/xyz">{window.largeLorem}</Route>
              <Route path="/">You are on the home page</Route>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
