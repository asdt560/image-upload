import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const searchImages = createAsyncThunk('images/searchImages', async (obj) => {
  const resp = await fetch(`http://127.0.0.1:5000/api/v1/images?search=${obj}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
    .then((resp) => resp.json());
  console.log(resp)
  return resp;
})

const searchSlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    images: []
  },
  extraReducers: (builder) => {
    builder.addCase(searchImages.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(searchImages.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      image: action.payload.body,
    }));
    builder.addCase(searchImages.rejected, (state, action) => ({
      ...state,
      loading: false,
      images: [],
      error: action.error.message,
    }));
  },
});

export default searchSlice.reducer;
export { searchImages };