const redux = require("redux");
const createStore = redux.createStore;

const produce = require("immer").produce;

//Initial State
const initialState = {
  name: "Kishore",
  address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
  },
};

//Action VAriable
const STREET_UPDATED = "STREET_UPDATED";

//Action
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      return produce(state, (draft) => {
        draft.address.street = "444 Main st";
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(updateStreet("456 Main St"));
unsubscribe();
