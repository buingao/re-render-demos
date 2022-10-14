import React, { useState, useMemo } from "react";

const Child = ({ data }: { data: { value: string } }) => {
  console.log("Child re-renders", data.value);
  return <>{data.value}</>;
};

const ChildMemo = React.memo(Child);

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const memoValue = useMemo(() => ({ value: "second" }), []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>Second child doesn't re-render</p>

      <button onClick={onClick}>点击</button>

      <p>props为复杂数据类型，未被useMemo记忆，导致组件re-renders</p>
      <ChildMemo data={{ value: "first" }} />

      <p>props为复杂数据类型但被useMemo记忆，组件不会re-renders</p>
      <ChildMemo data={memoValue} />
    </>
  );
}
