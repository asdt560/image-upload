import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const createSession = createAsyncThunk('session/createSession', async(obj) => {
  const response = await fetch('https://image-upload-qate.onrender.com/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
      credentials: 'include'
    })
    .then((response) => response.json())
  console.log(response)
  return response
})

const destroySession = createAsyncThunk('session/destroySession', async () => {
  const response = await fetch('https://image-upload-qate.onrender.com/api/v1/users/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then((response) => response)
  return null
})

const checkSession = createAsyncThunk('session/checkSession', async () => {
  const response = await fetch('https://image-upload-qate.onrender.com/api/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
      user: action.payload.user,
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
    builder.addCase(destroySession.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(destroySession.fulfilled, (state) => ({
      ...state,
      loading: false,
      user: null,
    }));
    builder.addCase(destroySession.rejected, (state, action) => ({
      ...state,
      loading: false,
      user: null,
      error: action.error.message,
    }));
  }
})

export { checkSession, createSession, destroySession };
export default sessionSlice.reducer;