import {
  provideSpectacularFeatureTest,
  SpectacularAppComponent,
  SpectacularFeatureLocation,
  SpectacularFeatureRouter,
} from '@ngworker/spectacular';
import { render, screen } from '@testing-library/angular';
import { Matcher } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { crisisCenterPath, crisisCenterRoute } from './index';

const findCrisisCenterHomeGreeting = () =>
  screen.findByText(/welcome to the crisis center/i);
const findCrisisLink = (name: Exclude<Matcher, number>) =>
  screen.findByRole('link', {
    name,
  });
const findNameControl = () => screen.findByPlaceholderText(/name/i);
const findSaveButton = () => screen.findByRole('button', { name: /save/i });
const findSelectedCrisis = (name: Matcher) =>
  screen.findByText(name, {
    selector: '.selected a',
  });

const setup = async () => {
  const user = userEvent.setup();

  const {
    fixture: {
      debugElement: { injector },
    },
  } = await render(SpectacularAppComponent, {
    providers: [
      provideSpectacularFeatureTest({ featurePath: crisisCenterPath }),
    ],
    routes: [crisisCenterRoute],
  });

  return {
    location: injector.get(SpectacularFeatureLocation),
    router: injector.get(SpectacularFeatureRouter),
    user,
  };
};

it('Edit crisis from crisis detail', async () => {
  const { location, router, user } = await setup();
  const crisisId = 2;
  await router.navigate(['~', crisisId]);

  await user.clear(await findNameControl());
  await user.type(await findNameControl(), 'The global temperature is rising');
  await user.click(await findSaveButton());

  expect(
    await findSelectedCrisis(/the global temperature is rising/i)
  ).toBeInTheDocument();
  expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
});

it('Edit crisis from crisis center home', async () => {
  const { router, user } = await setup();
  await router.navigateByUrl('~/');

  await user.click(
    await findCrisisLink(/procrastinators meeting delayed again/i)
  );

  await user.clear(await findNameControl());
  await user.type(await findNameControl(), 'Coral reefs are dying');
  await user.click(await findSaveButton());

  expect(await findCrisisCenterHomeGreeting()).toBeInTheDocument();
  expect(
    await findSelectedCrisis(/coral reefs are dying/i)
  ).toBeInTheDocument();
});
