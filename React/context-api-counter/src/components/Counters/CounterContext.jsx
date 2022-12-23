import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const CounterContext = createContext();

export const useCounter = () => useContext(CounterContext);

const CounterContextProvider = (props) => {
  const initialCounter = 0;

  const [counter, setCounter] = useState(initialCounter);

  const increment = () => {
    setCounter((prev) => prev + 1);
  };

  const decrement = () => {
    setCounter((prev) => prev - 1);
  };

  const reset = () => {
    setCounter(initialCounter);
  };

  const values = { counter, increment, decrement, reset };
  return (
    <CounterContext.Provider value={values}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
