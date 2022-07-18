import { Routes } from '@angular/router';
import { crisisCenterRoute } from '@tour-of-heroes/crisis-center/routing';
import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup',
  },
  crisisCenterRoute,
  { path: '', redirectTo: crisisCenterRoute.path, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
