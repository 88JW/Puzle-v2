import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    url: '',
    loaded: false,
    width: 0,
    height: 0,
  },
  reducers: {
    loadImage: (state, action) => {
      state.url = action.payload;
      state.loaded = true;
    },
    setDimensions: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { loadImage, setDimensions } = imageSlice.actions;
export default imageSlice.reducer;
