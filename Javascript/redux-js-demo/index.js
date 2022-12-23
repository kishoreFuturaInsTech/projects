const redux = require("redux");
const createStore = redux.createStore;
const reduxLogger = require("redux-logger");

const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

//Actions Variables
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// initial States
const cakeState = {
  numOfCakes: 10,
};

const iceCreamState = {
  numOfIceCream: 20,
};

//Actions

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "Cake Action",
  };
};

const buyIceCream = () => {
  return {
    type: BUY_ICECREAM,
    info: "IceCream Actions",
  };
};

//Reducers
const cakeReducer = (state = cakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = iceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    default:
      return state;
  }
};

//combineReducers
const rootReducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

//create Store
const store = createStore(rootReducers, applyMiddleware(logger));

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(buyCake());
store.dispatch(buyIceCream());
unsubscribe();
