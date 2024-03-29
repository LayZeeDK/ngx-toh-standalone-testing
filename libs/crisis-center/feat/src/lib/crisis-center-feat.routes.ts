import { Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate.guard';
import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent } from './crisis-list.component';

export const crisisCenterFeatRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolverService,
            },
          },
          {
            path: '',
            component: CrisisCenterHomeComponent,
          },
        ],
      },
    ],
  },
];
