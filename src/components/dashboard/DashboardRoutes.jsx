import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import DashboardComics from './DashboardComics';
import DashboardEpisode from './DashboardEpisodes';

const DashboardRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/`} exact>
        <DashboardComics />
      </Route>
      <Route path={`${path}/:comicID`} exact>
        <DashboardEpisode />
      </Route>
      <Redirect to={`${path}/`} />
    </Switch>
  );
};

export default DashboardRoutes;
