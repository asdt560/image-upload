/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import { act } from 'react';
import App from '../App';




describe('renders main screen', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('renders title', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          valid: false,
          user: null
        })
      ],
      [
        JSON.stringify({
          status: "success",
          body: [{filepath: '#'}]
        })
      ]
    )
    await act(() => {
      render(
        <Provider store={store}>  
          <App />
        </Provider>
      );
    })
    
    const linkElement = screen.getByText(/See images here/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders navbar logged out', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          valid: false,
          user: null
        })
      ],
      [
        JSON.stringify({
          status: "success",
          body: [{filepath: '#'}]
        })
      ]
    )
    await act(() => {
      render(
        <Provider store={store}>  
          <App />
        </Provider>
      );
    })
    const navBarLogo = screen.getByText(/logo/i)
    const loginButton = screen.getByText(/Log In/i)
    const addImage = screen.queryByText(/Add Image/i)
    expect(navBarLogo).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(addImage).toBeNull();
  })

  it('renders navbar logged in', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          user: { username: "test"}
        })
      ],
      [
        JSON.stringify({
          status: "success",
          body: [{filepath: '#'}]
        })
      ]
    )
    await act(() => {
      render(
        <Provider store={store}>  
          <App />
        </Provider>
      );
    })
    const navBarUser = screen.getByText(/test/i)
    const addImage = screen.getByText(/Add Image/i)
    const loginButton = screen.queryByText(/Log In/i)
    expect(navBarUser).toBeInTheDocument();
    expect(addImage).toBeInTheDocument();
    expect(loginButton).toBeNull();
  })
});