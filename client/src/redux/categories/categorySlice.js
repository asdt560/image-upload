import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getCategories = createAsyncThunk('categories/getCategory', async () => {
  const resp = await fetch('http://127.0.0.1:5000/api/v1/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
    .then((resp) => resp.json())
  console.log(resp)
  return resp;
});

const getCategoryById = createAsyncThunk('categories/getCategoryById', async (id) => {
  console.log(id)
  const resp = await fetch(`http://127.0.0.1:5000/api/v1/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
    .then((resp) => resp.json())
  console.log(resp)
  return resp;
})

const addCategory = createAsyncThunk('categories/addCategory', async (obj) => {
  const response = await fetch('http://127.0.0.1:5000/api/v1/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(obj),
  });
  return response.json();
});

const categorySlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    categories: [],
    currentCategory: {},
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
    builder.addCase(getCategoryById.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getCategoryById.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      currentCategory: action.payload,
    }));
    builder.addCase(getCategoryById.rejected, (state, action) => ({
      ...state,
      loading: false,
      currentCategory: {},
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
export { getCategories, getCategoryById, addCategory };