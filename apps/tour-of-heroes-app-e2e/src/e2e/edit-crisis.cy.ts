const getCrisisCenterHomeGreeting = () =>
  cy.contains('Welcome to the Crisis Center');
const getCrisisLink = (name: string) => cy.contains(name, 'a');
const getNameControl = () => cy.get('[placholder=name]');
const getSaveButton = () => cy.contains('Save', 'button');
const getSelectedCrisis = (name: string) => cy.contains(name, '.selected a');

it('Edit crisis from crisis detail', () => {
  const crisisId = 2;
  const newCrisisName = 'The global temperature is rising';
  cy.visit(`/crisis-center/${crisisId}`);

  getNameControl().clear().type(newCrisisName).click();
  getSelectedCrisis(newCrisisName).should('be.visible');
  cy.location().should((location) => {
    expect(location.pathname).to.equal(`/crisis-center`);
    expect(location.href).to.match(new RegExp(`;id=${crisisId};foo=foo$`));
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
