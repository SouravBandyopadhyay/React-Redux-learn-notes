// Only 1 shop which sells CAKE along with Icecream
import { legacy_createStore as createStore } from 'redux';
import { bindActionCreators, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
// Icecream product in the same store
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// Action Creator for Cake
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function restockedCake(qty = 5) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}
// Action Creator for Icecream
function orderIcecream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}
function restockIcecream(qty = 2) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

const initialCakeState = {
  numofCakes: 5,
};
const initialIcecreamState = {
  numofIcecream: 10,
};

// Look codevolution video 11 for help
// here rather than managing the state my only reducer only we break it into 2 reducer for each item
const Cakereducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numofCakes: state.numofCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numofCakes: state.numofCakes + action.payload,
      };
    default:
      return state;
  }
};

const Icecreamreducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numofIcecream: state.numofIcecream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numofIcecream: state.numofIcecream + action.payload,
      };
    default:
      return state;
  }
};
// as we use different reducer for different item we have to combinereducer
const rootReducer = combineReducers({
  cake: Cakereducer,
  icecream: Icecreamreducer,
});
const store = createStore(rootReducer);
//const store = createStore(rootReducer, applyMiddleware(createLogger)); // applying middleware to get all logs

console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() =>
  console.log('Update State', store.getState())
);

// Middleware syntax with redux-logger
//const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  {
    orderCake,
    restockedCake,
    orderIcecream,
    restockIcecream,
  },
  store.dispatch
);

actions.orderIcecream();
actions.orderIcecream();
actions.orderCake();
actions.orderCake();
actions.restockIcecream();
unsubscribe(); // further at last we unsubscribe bcz we dont need any unneccesary changes in the store of application.
// after unsubscribe the state is not getting update it is kind of locked think like it.
