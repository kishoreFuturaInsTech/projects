import React from "react";
import { useCounter } from "./Counters/CounterContext";

function ComponentA() {
  const { counter, increment, decrement, reset } = useCounter();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export default ComponentA;
