import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import App from './App';

test('renders title', () => {
  render(
    <Provider store={store}>  
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/See images here/i);
  expect(linkElement).toBeInTheDocument();
});

describe('renders navbar', () => {
  it('renders', () => {
    render(
      <Provider store={store}>  
        <App />
      </Provider>
    )
    const navBar = screen.getByText(/logo/i)
    expect(navBar).toBeInTheDocument();
  })
});