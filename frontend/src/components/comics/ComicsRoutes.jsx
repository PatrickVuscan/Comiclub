import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import ComicsReader from './ComicsReader';
import ComicsSummary from './ComicsSummary';

const ComicsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:comicId`} exact>
        <ComicsSummary />
      </Route>
      <Route path={`${path}/:comicId/:episodeId`} exact>
        <ComicsReader />
      </Route>
      <Redirect to={`${path}/`} />
    </Switch>
  );
};

export default ComicsRoutes;
