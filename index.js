const store = require('./app/store.js');
const cakeActions = require('./app/features/cake/cakeSlice').cakeActions;
const icecreamActions =
  require('./app/features/icecream/icecreamSlice').icecreamActions;
console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() => {
  console.log('Update State', store.getState());
});
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked());
store.dispatch(cakeActions.restocked());
store.dispatch(icecreamActions.restocked(4));
store.dispatch(icecreamActions.ordered());
unsubscribe();
