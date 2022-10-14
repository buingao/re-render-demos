import { useState, memo } from "react";

const Child = ({ data }: { data: string; state?: number }) => {
  console.log("Child re-renders");
  return <p>{data}</p>;
};

const ChildMemo = memo(Child);

const value = "test";

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>prop未变化，Child依旧重渲染了</p>
      <button onClick={onClick}>点击{state}</button>

      <Child data={value} />
      <p>props如果有变化的值，即便child未用到，也会导致child重渲染</p>
      <ChildMemo data={value} state={state} />
    </>
  );
};

export default App;
