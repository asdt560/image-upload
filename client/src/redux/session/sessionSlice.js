import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const createSession = createAsyncThunk('session/createSession', async(obj) => {
  const response = await fetch('http://127.0.0.1:5000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {token}'
      },
      body: JSON.stringify(obj),
      credentials: 'include'
    })
    .then((response) => response.json())
  console.log(response)
  return response
})

const checkSession = createAsyncThunk('session/checkSession', async () => {
  const response = await fetch('http://127.0.0.1:5000/api/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {token}'
    },
    credentials: "include",
  })
    .then((response) => response.json())
  console.log(response)
  return response
})

const sessionSlice = createSlice({ 
  name: 'session', 
  initialState: { 
    user: null, 
    loading: false, 
    error: null 
  }, 
  extraReducers: (builder) => {
    builder.addCase(checkSession.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(checkSession.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload,
    }));
    builder.addCase(checkSession.rejected, (state, action) => ({
      ...state,
      loading: false,
      user: null,
      error: action.error.message,
    }));
    builder.addCase(createSession.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(createSession.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload.user,
    }));
    builder.addCase(createSession.rejected, (state, action) => ({
      ...state,
      loading: false,
      user: null,
      error: action.error.message,
    }));
  }
})

export { checkSession, createSession };
export default sessionSlice.reducer;