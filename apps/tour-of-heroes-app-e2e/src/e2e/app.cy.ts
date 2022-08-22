import { getGreeting } from '../support/app.po';

describe('tour-of-heroes-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Tour of Heroes');
  });
});
