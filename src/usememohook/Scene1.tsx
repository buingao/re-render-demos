import React, { useState, useMemo } from "react";

const Child = ({ data }: { data: { value: string } }) => {
  console.log("Child re-renders", data.value);
  return <p>Child：value一直是{data.value}，未改变</p>;
};

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const memoValue = useMemo(() => ({ value: "child" }), []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>非必要的使用useMemo/useCallback（二者同质）</p>
      <p>组件没有使用React.memo包裹，只是使用useMemo记忆value，依旧会重渲染</p>
      <p>子组件props未改变，但依旧重渲染</p>

      <button onClick={onClick}>点击</button>

      <Child data={memoValue} />
    </>
  );
}
