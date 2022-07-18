import { Routes } from '@angular/router';
import { crisisCenterPath } from '@tour-of-heroes/crisis-center/feat';
import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup',
  },
  {
    path: crisisCenterPath,
    loadChildren: () =>
      import('@tour-of-heroes/crisis-center/feat').then(
        (esModule) => esModule.crisisCenterRoutes
      ),
    data: { preload: true },
  },
  { path: '', redirectTo: crisisCenterPath, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
