const store = require("./app/store");

// const cakeAction = require("./features/cake/cakeSlice").cakeActions;
const fetchUsers = require("./features/user/userSlice").fetchUsers;

// const iceCreamAction =
//   require("./features/icecream/iceCreamSlice").iceCreamAction;

// const unsubscribe = store.subscribe(() => {
//   console.log("Updated", store.getState());
// });

store.dispatch(fetchUsers());
console.log(store.getState());

// store.dispatch(cakeAction.ordered());
// store.dispatch(cakeAction.ordered());
// store.dispatch(cakeAction.ordered());
// store.dispatch(cakeAction.restocked(3));
// store.dispatch(iceCreamAction.ordered());
// store.dispatch(iceCreamAction.ordered());
// store.dispatch(iceCreamAction.restocked(4));

// unsubscribe();
