import { Route } from '@angular/router';

import { crisisCenterPath } from './crisis-center-path';

export const crisisCenterRoute: Route = {
  path: crisisCenterPath,
  loadChildren: () =>
    import('@tour-of-heroes/crisis-center/feat').then(
      (esModule) => esModule.crisisCenterFeatRoutes
    ),
  data: { preload: true },
};
