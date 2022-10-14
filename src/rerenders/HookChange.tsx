import { useState, createContext, useContext, useMemo, ReactNode } from "react";

const Context = createContext<{ value: number }>({ value: 1 });

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const value = useMemo(
    () => ({
      value: state,
    }),
    [state]
  );

  return (
    <Context.Provider value={value}>
      <button onClick={onClick}>点击</button>
      {children}
    </Context.Provider>
  );
};

const useValue = () => useContext(Context);

// hooks chain
const useSomething = () => {
  const count = useValue();
  return count.value;
};

const Child = () => {
  const value = useSomething();
  console.log("Child re-renders:", value);
  return <></>;
};

const App = () => {
  return (
    <Provider>
      <h2>打开控制台，点击按钮</h2>
      <p>hooks链式作用，Child将re-render</p>

      <Child />
    </Provider>
  );
};

export default App;
