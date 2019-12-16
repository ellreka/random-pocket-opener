import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [];

const pocketModule = createSlice({
  name: 'pocket',
  initialState: initialState,
  reducers: {
    openPocket: (state, action) => {
      console.log('open-pocket');
    },
  },
});

export default pocketModule;
