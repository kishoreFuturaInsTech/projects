import ComponentA from "./components/ComponentA";
import CounterContextProvider from "./components/Counters/CounterContext";

function App() {
  return (
    <CounterContextProvider>
      <h1>Kishore</h1>
      <ComponentA />
    </CounterContextProvider>
  );
}

export default App;
