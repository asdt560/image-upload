import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getCategories = createAsyncThunk('categories/getCategory', async () => {
  const resp = await fetch('http://localhost:5000/api/v1/categories')
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const addCategory = createAsyncThunk('categories/addCategory', async (obj) => {
  const response = await fetch('http://localhost:5000/api/v1/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return response.json();
});

const categorySlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getCategories.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      categories: action.payload,
    }));
    builder.addCase(getCategories.rejected, (state, action) => ({
      ...state,
      loading: false,
      categories: [],
      error: action.error.message,
    }));
    builder.addCase(addCategory.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(addCategory.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(addCategory.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message,
    }));
  },
});

export default categorySlice.reducer;
export { getCategories, addCategory };