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
});