import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// 两个context
const ContextData = createContext<number>(1);
const ContextApi = createContext<Dispatch<SetStateAction<number>>>(
  () => undefined
);

// Provider组件
const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  return (
    <ContextData.Provider value={state}>
      {/* 提供setState函数，api上下文 */}
      <ContextApi.Provider value={setState}>{children}</ContextApi.Provider>
    </ContextData.Provider>
  );
};

// 事件所在组件，不会重渲染
const Child1 = () => {
  const useApi = () => useContext(ContextApi);
  const api = useApi();

  console.log("使用API的子组件 re-renders");

  const onClick = () => {
    api(Math.random() * 10);
  };

  return <button onClick={onClick}>在context中设置随机数</button>;
};

// 使用data，会重渲染
const Child2 = () => {
  const useData = () => useContext(ContextData);
  const value = useData();

  console.log(`使用Data (${value}) 的子组件 re-renders`);

  return <p>{value}</p>;
};

export default function App() {
  return (
    <Provider>
      <h2>打开控制台，点击按钮</h2>
      <p>只使用data的子组件会re-render</p>
      <p>触发方法所在组件不会更新</p>

      <Child1 />
      <Child2 />
    </Provider>
  );
}
