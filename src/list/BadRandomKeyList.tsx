import React, { useState, useEffect } from "react";

const Child = ({ value }: { value: number }) => {
  console.log("Child re-renders", value);

  // 类似componentDidMount()，证明挂载了此组件
  useEffect(() => {
    console.log("Child re-mounts");
  }, []);

  return <div>{value}</div>;
};
const ChildMemo = React.memo(Child);

const values = [1, 2, 3];

export default function App() {
  // 状态改变，此组件重渲染，无memo的子组件也会重渲染
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <h2>打开控制台，点击按钮</h2>

      <button onClick={onClick}>点击 {state}</button>

      {/* memo失效，组件的props随每次改变state都会变化，key在不断变化，组件非同一个，就会重新挂载 */}
      {values.map((val) => (
        <ChildMemo value={val} key={Math.random()} />
      ))}
    </>
  );
}
