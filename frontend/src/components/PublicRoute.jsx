import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from '../context';

function PublicRoute({ children, ...rest }) {
  const {
    authState: { loggedIn },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() =>
        !loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/home',
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
