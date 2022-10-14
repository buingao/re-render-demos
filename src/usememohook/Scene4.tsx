import React, { useState, useMemo } from "react";

const ExpensiveChild = ({ data }: { data: { value: number } }) => {
  console.log("Expensive Child re-renders", data.value);
  return <p>{data.value}</p>;
};

const values = [1, 2, 3];

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const items = useMemo(() => {
    return values.map((val) => (
      <ExpensiveChild data={{ value: val }} key={val} />
    ));
  }, []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>CPU密集型子组件不会重新渲染</p>

      <button onClick={onClick}>点击 {state}</button>

      {items}
    </>
  );
}
