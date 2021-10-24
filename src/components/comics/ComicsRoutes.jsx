import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import ComicsSummary from './ComicsSummary';
import ComicsReader from './ComicsReader';

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
