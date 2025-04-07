import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const createRegistration = createAsyncThunk('registration/createRegistration', async(obj, { rejectWithValue }) => {
  const response = await fetch('http://localhost:5000/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then(async (response) => {
    if(response.status !== 200) {
      let error = await response.text().then((error) => JSON.parse(error))
      console.log(error)
      return rejectWithValue(error);
    }
    return response;
  }).then((response) => response)
  console.log(response)
  return response;
})

const registrationSlice = createSlice({ 
  name: 'registration', 
  initialState: { 
    user: null, 
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(createRegistration.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(createRegistration.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload.user,
    }));
    builder.addCase(createRegistration.rejected, (state, action) => ({
      ...state,
      loading: false,
      user: null,
      error: action.error.message,
    }));
  }
})

export { createRegistration };
export default registrationSlice.reducer;