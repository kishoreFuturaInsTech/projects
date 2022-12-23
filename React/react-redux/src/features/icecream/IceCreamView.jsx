import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "../icecream/iceCreamSlice";

function IceCreamView() {
  const numOfIceCreams = useSelector((state) => state.iceCream.numOfIcecreams);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Ice Cream: {numOfIceCreams}</h2>
      <button onClick={() => dispatch(ordered())}>No of Ice Cream</button>
      <button onClick={() => dispatch(restocked(5))}>Restock Ice Cream</button>
    </div>
  );
}

export default IceCreamView;
