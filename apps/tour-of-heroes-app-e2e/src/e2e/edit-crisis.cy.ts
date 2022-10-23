const getCrisisCenterHomeGreeting = () =>
  cy.contains('Welcome to the Crisis Center', {
    matchCase: false,
  });
const getCrisisLink = (name: string) => cy.get('a').contains(name, {
  matchCase: false,
});
const getNameControl = () => cy.get('[placeholder=name]');
const getSaveButton = () => cy.get('button').contains('Save', {
  matchCase: false,
});
const getSelectedCrisis = (name: string) =>
  cy.get('.selected a').contains(name, {
    matchCase: false,
  });

it('Edit crisis from crisis detail', () => {
  const crisisId = 2;
  const newCrisisName = 'The global temperature is rising';
  cy.visit(`/crisis-center/${crisisId}`);

  getNameControl().clear().type(newCrisisName);
  getSaveButton().click();

  getSelectedCrisis(newCrisisName).should('be.visible');
  cy.location().should((location) => {
    expect(location.pathname).to.equal(`/crisis-center;id=${crisisId};foo=foo`);
  });
});

it('Edit crisis from crisis center home', () => {
  const newCrisisName = 'Coral reefs are dying';
  cy.visit('/crisis-center');

  getCrisisLink('Procrastinators meeting delayed again').click();

  getNameControl().clear().type(newCrisisName);
  getSaveButton().click();

  getCrisisCenterHomeGreeting().should('be.visible');
  getSelectedCrisis(newCrisisName).should('be.visible');
});
