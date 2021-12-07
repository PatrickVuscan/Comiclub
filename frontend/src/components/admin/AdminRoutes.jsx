import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import AdminAllUsers from './AdminAllUsers';
import AdminUser from './AdminUser';

const AdminRoutes = () => {
  const { path } = useRouteMatch();

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
