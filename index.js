// For only 1 shop which sells icecream
import { legacy_createStore as createStore } from 'redux';
import { bindActionCreators } from 'redux';
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
// Action Creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    // quantity: 1,
    payload: 1,
  };
}
function restockedCake(qty = 5) {
  // qty set to 5
  return {
    type: CAKE_RESTOCKED,
    // quantity: qty, // payload
    payload: qty,
  };
}
// Initial State of the application
const initialState = {
  numofCakes: 10,
};
// Reducer function : inside this logic part comes
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, //creating a shallow copy in order to change the changes we need
        numofCakes: state.numofCakes - 1, // logic part to reduce the cake by -1
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numofCakes: state.numofCakes + action.payload, // ++
        // numofCakes: state.numofCakes + 5, it is like adding counter+1
      };
    default:
      return state;
  }
};

//Store: Holds the application state

const store = createStore(reducer);
console.log('Initial State', store.getState()); // Will print the initial state
const unsubscribe = store.subscribe(() =>
  console.log('Update State', store.getState())
); // allows access the state via getState()

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockedCake());
store.dispatch(restockedCake());
store.dispatch(restockedCake());
store.dispatch(orderCake());
store.dispatch(restockedCake());
store.dispatch(restockedCake(1)); // increase by 1
store.dispatch(restockedCake(2)); // increase by 2

// //bindActionCreators
// const actions = bindActionCreators(
//   { orderCake, restockedCake },
//   store.dispatch
// );
// actions.orderCake();
// actions.restockedCake();
// actions.restockedCake(1);

unsubscribe(); // further at last we unsubscribe bcz we dont need any unneccesary changes in the store of application.
// after unsubscribe the state is not getting update it is kind of locked think like it.
