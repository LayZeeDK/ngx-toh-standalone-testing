import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  provideSpectacularFeatureTest,
  SpectacularAppComponent,
} from '@ngworker/spectacular';
import { crisisCenterPath, crisisCenterRoute } from './index';

beforeEach(() => {
  cy.mount(SpectacularAppComponent, {
    imports: [RouterTestingModule.withRoutes([crisisCenterRoute])],
    providers: [
      provideSpectacularFeatureTest({ featurePath: crisisCenterPath }),
    ],
  }).then(
    async ({
      fixture: {
        debugElement: { injector },
      },
    }) => {
      // Cannot resolve Spectacular's internal feature path token
      // const featureRouter = injector.get(SpectacularFeatureRouter);

      router = injector.get(Router);
      await router.navigate([crisisCenterPath]);
    }
  );
});

let router: Router;

it('Edit crisis from crisis detail', async () => {
  // TODO
});

it('Edit crisis from crisis center home', () => {
  // TODO
});
