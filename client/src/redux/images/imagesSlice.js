import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getImages = createAsyncThunk('images/getImage', async (params) => {
  const resp = await fetch(`https://image-upload-qate.onrender.com/api/v1/images?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {token}'
    },
    credentials: "include",
  })
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const getImagesPerCategory = createAsyncThunk('images/getImagesPerCategory', async (cat) => {
  const resp = await fetch(`https://image-upload-qate.onrender.com/api/v1/images/${cat}`, {
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

const addImage = createAsyncThunk('images/addImage', async (obj) => {
  console.log(obj)
  const response = await fetch('https://image-upload-qate.onrender.com/api/v1/images', {
    method: 'POST',
    credentials: "include",
    body: obj,
  })
    .then((response) => response.json())
  console.log(response)
  return response;
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
    builder.addCase(getImagesPerCategory.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getImagesPerCategory.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      image: action.payload,
    }));
    builder.addCase(getImagesPerCategory.rejected, (state, action) => ({
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
export { addImage, getImages, getImagesPerCategory };