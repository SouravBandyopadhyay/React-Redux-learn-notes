const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numofCakes: 10,
};
const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numofCakes--; //decrease stock by 1
    },
    restocked: (state) => {
      state.numofCakes++; // increase stock by 1
    },
  },
});
module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
// from lec-20
