

import { render } from '@testing-library/react';
import App from '../src/App';

test('renders app without crashing', () => {
  render(<App />);
});