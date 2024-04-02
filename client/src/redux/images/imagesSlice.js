import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getImages = createAsyncThunk('images/getImage', async (params) => {
  const resp = await fetch(`http://localhost:5000/api/v1/images?${params}`)
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const addImage = createAsyncThunk('images/addImage', async (obj) => {
  const response = await fetch('http://localhost:5000/api/v1/images', {
    method: 'POST',
    body: obj,
  });
  return response.json();
});

const imagesSlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    images: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getImages.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      image: action.payload,
    }));
    builder.addCase(getImages.rejected, (state, action) => ({
      ...state,
      loading: false,
      images: [],
      error: action.error.message,
    }));
    builder.addCase(addImage.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(addImage.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(addImage.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message,
    }));
  },
});

export default imagesSlice.reducer;
export { addImage, getImages };