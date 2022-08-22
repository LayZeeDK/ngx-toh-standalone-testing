import { Type } from '@angular/core';
import { mount, MountConfig, MountResponse } from 'cypress/angular';

import '@testing-library/cypress/add-commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mount<TComponent>(
        component: Type<TComponent> | string,
        config?: MountConfig<TComponent>
      ): Chainable<MountResponse<TComponent>>;
    }
  }
}

Cypress.Commands.add('mount', mount);
