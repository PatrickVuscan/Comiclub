import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Comic from './Comic';
import ComicReader from './ComicReader';

const ComicsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:comicId`} exact>
        <Comic />
      </Route>
      <Route path={`${path}/:comicId/:episodeId`} exact>
        <ComicReader />
      </Route>
      <Redirect to={`${path}/`} />
    </Switch>
  );
};

export default ComicsRoutes;
