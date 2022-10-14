import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";

const Context = createContext<{ value: number; staticValue: string }>({
  value: 1,
  staticValue: "",
});

const useValue = () => useContext(Context);

// Provider
const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  // state改变，只value变化，data是复杂类型，对象
  const data = useMemo(
    () => ({
      value: state,
      staticValue: "1",
    }),
    [state]
  );

  return (
    <Context.Provider value={data}>
      <button onClick={onClick}>点击</button>
      {children}
    </Context.Provider>
  );
};

const Child1 = () => {
  // 拿到context传来的 value
  const { value } = useValue();
  console.log("value 子组件渲染了：", value);
  // value变化，re-render
  return <p>{value}</p>;
};

// HOC 高阶组件
const withStaticValueFromContext = (Component) => {
  // memo Child2
  const ComponentMemo = React.memo(Component);

  return () => {
    // 拿到context传来的 staticValue
    const { staticValue } = useValue();
    return <ComponentMemo staticValue={staticValue} />;
  };
};

const Child2 = ({ staticValue }: { staticValue: string }) => {
  console.log("staticValue 子组件渲染了：", staticValue);
  return <p>{staticValue}</p>;
};

const Child2WithStaticValue = withStaticValueFromContext(Child2);

const Selector = () => {
  return (
    <Provider>
      <h2>打开控制台，点击按钮</h2>
      <p>
        仅接收动态内容的子组件 <strong>会</strong> 重新渲染
      </p>
      <Child1 />
      <p>
        context "selector"的子组件 <strong>不会</strong> 重新渲染
      </p>
      <Child2WithStaticValue />
    </Provider>
  );
};

export default Selector;
