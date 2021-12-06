import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import ComicsReader from './ComicsReader';
import ComicsSummary from './ComicsSummary';

const ComicsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:comicID`} exact>
        <ComicsSummary />
      </Route>
      <Route path={`${path}/:comicID/:episodeID`} exact>
        <ComicsReader />
      </Route>
      <Redirect to={`${path}/`} />
    </Switch>
  );
};

export default ComicsRoutes;
