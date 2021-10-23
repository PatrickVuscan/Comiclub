import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context';

function PrivateRoute({ children, ...rest }) {
  const {
    authState: { loggedIn },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
