import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "../cake/cakeSlice";

function CakeView() {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Cakes: {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>No of Cakes</button>
      <button onClick={() => dispatch(restocked(3))}>Restock Cakes</button>
    </div>
  );
}

export default CakeView;
