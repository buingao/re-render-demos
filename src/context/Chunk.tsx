import { useState, createContext, useContext, ReactNode } from "react";

const ContextData1 = createContext<number>(123);
const ContextData2 = createContext<string>("abc");

const Provider = ({ children }: { children: ReactNode }) => {
  const [numState, setNumState] = useState(123);
  const [strState, setStrState] = useState("abc");

  // 由两个provider分别提供number和string类型的数据
  return (
    <ContextData1.Provider value={numState}>
      <ContextData2.Provider value={strState}>
        {/* 点击更改number */}
        <button onClick={() => setNumState(numState + 1)}>改变 number</button>
        {/* 点击更改string */}
        <button onClick={() => setStrState(`${strState}d`)}>改变 string</button>
        {children}
      </ContextData2.Provider>
    </ContextData1.Provider>
  );
};

const ChildNum = () => {
  const useNumData = () => useContext(ContextData1);
  const num = useNumData();
  console.log("依赖 num data 子组件 re-render");

  return <p>{num}</p>;
};

const ChildStr = () => {
  const useStrData = () => useContext(ContextData2);
  const str = useStrData();
  console.log("依赖 string data 子组件 re-render");

  return <p>{str}</p>;
};

export default function App() {
  return (
    <Provider>
      <h2>打开控制台，点击按钮</h2>
      <p>拆分多个不同的providers提供独立的数据，子组件独立更新</p>
      <ChildNum />
      <ChildStr />
    </Provider>
  );
}
