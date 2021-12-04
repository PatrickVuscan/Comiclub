import { useState } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import SignupContext from './SignupContext';
import SignupDetails from './SignupDetails';
import SignupSuggestions from './SignupSuggestions';

const SignupRoutes = () => {
  const { path } = useRouteMatch();
  const [signupState, setSignupState] = useState({
    username: '',
    email: '',
    password: '',
    favourites: {},
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
