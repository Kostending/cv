import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    initiated: false,
    name: '',
    fedness: 10,
    health: 10
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setInitiated: (state, action) => {
      state.initiated = action.payload;
    },
  },
});

export const { setName, setInitiated } = gameSlice.actions;

export const selectName = state => state.game.name;
export const selectInitiated = state => state.game.initiated;

export default gameSlice.reducer;
