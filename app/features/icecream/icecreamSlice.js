const createSlice = require('@reduxjs/toolkit').createSlice;
const initialState = {
  numofIcecream: 20,
};
const icecreamSlice = createSlice({
  name: 'Icecream',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numofIcecream--; // decrease stock by 1
    },
    restocked: (state, action) => {
      state.numofIcecream += action.payload; // depends on the restock
    },
  },
});
module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
