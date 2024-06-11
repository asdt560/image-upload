import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import App from '../App';

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
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('renders logged out', () => {
    fetch.mockResponseOnce(JSON.stringify({
      valid: false,
      user: null
    }))
    render(
      <Provider store={store}>  
        <App />
      </Provider>
    )
    const navBarLogo = screen.getByText(/logo/i)
    const loginButton = screen.getByText(/Log In/i)
    expect(navBarLogo).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  })
});