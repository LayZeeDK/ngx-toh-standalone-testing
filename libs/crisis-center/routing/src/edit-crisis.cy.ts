import { Location } from '@angular/common';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  provideSpectacularFeatureTest,
  SpectacularAppComponent,
} from '@ngworker/spectacular';
import { crisisCenterPath, crisisCenterRoute } from './index';

const findCrisisCenterHomeGreeting = () =>
  cy.contains(/welcome to the crisis center/i);
const findCrisisLink = (name: string | RegExp) => cy.get('a').contains(name);
const findNameControl = () => cy.get('[placeholder="name"]');
const findSaveButton = () => cy.get('button').contains(/save/i);
const findSelectedCrisis = (name: string | RegExp) =>
  cy.get('.selected a').contains(name);

const setup = () =>
  cy
    .mount(SpectacularAppComponent, {
      imports: [RouterTestingModule.withRoutes([crisisCenterRoute])],
      providers: [
        provideSpectacularFeatureTest({ featurePath: crisisCenterPath }),
      ],
    })
    .then(
      async ({
        fixture: {
          debugElement: { injector },
        },
      }) => {
        // Cannot resolve Spectacular's internal feature path token
        // const featureRouter = injector.get(SpectacularFeatureRouter);

        const location = injector.get(Location);
        const ngZone = injector.get(NgZone);
        const router = injector.get(Router);

        await ngZone.run(() => router.navigate([crisisCenterPath]));

        return {
          location,
          ngZone,
          router,
        };
      }
    );

it('Edit crisis from crisis detail', () => {
  setup().then(async ({ location, ngZone, router }) => {
    const crisisId = 2;
    await ngZone.run(() => router.navigate([crisisCenterPath, crisisId]));

    findNameControl()
      .clear({ force: true })
      .type('The global temperature is rising');
    findSaveButton().click();

    findSelectedCrisis(/the global temperature is rising/i)
      .should('be.visible')
      .then(() => {
        expect(location.path()).to.deep.equal(
          `/${crisisCenterPath};id=${crisisId};foo=foo`
        );
      });
  });
});

it('Edit crisis from crisis center home', () => {
  setup().then(() => {
    findCrisisLink(/procrastinators meeting delayed again/i).click();

    findNameControl().clear({ force: true }).type('Coral reefs are dying');
    findSaveButton().click();

    findCrisisCenterHomeGreeting().should('be.visible');
    findSelectedCrisis(/coral reefs are dying/i).should('be.visible');
  });
});
