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

const Child1 = () => {
  // 依赖变化的value
  const { value } = useValue();
  console.log("Child1 re-renders: ", value);
  return <></>;
};

const Child2 = () => {
  // 依赖变化的value
  const { value } = useValue();
  console.log("Child2 re-renders: ", value);
  return <></>;
};

const App = () => {
  return (
    <Provider>
      <h2>打开控制台，点击按钮</h2>
      <p>两个child页面都会重新渲染</p>

      <Child1 />
      <Child2 />
    </Provider>
  );
};

export default App;
