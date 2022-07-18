import { Routes } from '@angular/router';
import { crisisCenterPath } from '@tour-of-heroes/crisis-center';

export const appRoutes: Routes = [
  {
    path: crisisCenterPath,
    loadChildren: () =>
      import('@tour-of-heroes/crisis-center').then((m) => m.crisisCenterRoutes),
  },
];
