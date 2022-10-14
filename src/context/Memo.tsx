import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";

const Context = createContext<{ value: number }>({ value: 1 });
const Context2 = createContext<{ value: number }>({ value: 1 });

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  //   const onClick = () => {
  //     setState(state + 1);
  //   };

  const data = useMemo(
    () => ({
      value: state,
    }),
    [state]
  );
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

const Provider2 = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  //   const onClick = () => {
  //     setState(state + 1);
  //   };

  // 这里没有memo
  const data = {
    value: state,
  };

  //   const data = useMemo(
  //     () => ({
  //       value: state,
  //     }),
  //     [state]
  //   );

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

const useValue = () => useContext(Context);
const useValue2 = () => useContext(Context2);

const Child1 = () => {
  const { value } = useValue();
  const { value: value2 } = useValue2();
  console.log("Child1 re-renders: ", value, value2);
  return <></>;
};

const Child2 = () => {
  const { value } = useValue();
  const { value: value2 } = useValue2();
  console.log("Child2 re-renders: ", value, value2);
  return <></>;
};

const Child1Memo = React.memo(Child1);
const Child2Memo = React.memo(Child2);

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <Provider>
      <Provider2>
        <h2>打开控制台，点击按钮</h2>
        <p>
          切换Provider2中的data，一个使用useMemo，另一个没使用memo，查看控制台输出
        </p>
        <p>没有memoize value时，两个组件会被非必需的重渲染</p>
        <button onClick={onClick}>button {state}</button>
        <Child1Memo />
        <Child2Memo />
      </Provider2>
    </Provider>
  );
}
