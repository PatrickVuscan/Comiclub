import React, { useState } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import SignupContext from './SignupContext';
import SignupDetails from './SignupDetails';
import SignupSuggestions from './SignupSuggestions';

const SignupRoutes = () => {
  const { path } = useRouteMatch();
  const [signupState, setSignupState] = useState({
    name: '',
    username: '',
    password: '',
    favourites: [],
  });

  return (
    <SignupContext.Provider value={{ signupState, setSignupState }}>
      <Switch>
        <Route path={`${path}/details`}>
          <SignupDetails />
        </Route>
        <Route path={`${path}/suggestions`}>
          <SignupSuggestions />
        </Route>
        <Redirect to={`${path}/details`} />
      </Switch>
    </SignupContext.Provider>
  );
};

export default SignupRoutes;
