import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AppContainer from '@/app/_Containers/AppContainer';

import thunk from 'redux-thunk';

describe('AppContainer', () => {
  it('Renders landing component', () => {
    render(<AppContainer />);
  });
});
