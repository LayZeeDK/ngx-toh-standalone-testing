import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { provideGlobalRouterStore } from '@ngworker/router-component-store';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { SelectivePreloadingStrategyService } from './app/selective-preloading-strategy.service';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      RouterModule.forRoot(appRoutes, {
        preloadingStrategy: SelectivePreloadingStrategyService,
      })
    ),
    provideGlobalRouterStore(),
  ],
}).catch((err) => console.error(err));
