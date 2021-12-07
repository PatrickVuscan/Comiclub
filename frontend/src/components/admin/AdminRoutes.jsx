import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import AuthContext from '../../context';
import AdminAllUsers from './AdminAllUsers';
import AdminUser from './AdminUser';

const AdminRoutes = () => {
  const { path } = useRouteMatch();
  const {
    authState: { loggedIn, username },
  } = useContext(AuthContext);

  const history = useHistory();

  if (!loggedIn || username !== 'admin') {
    history.replace('/home');
  }

  return (
    <Switch>
      <Route path={`${path}/`} exact>
        <AdminAllUsers />
      </Route>
      <Route path={`${path}/:userID`} exact>
        <AdminUser />
      </Route>
      <Redirect to={`${path}/`} />
    </Switch>
  );
};

export default AdminRoutes;
