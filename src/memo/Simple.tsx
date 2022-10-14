import React, { useState } from "react";

const Child = () => {
  console.log("Child re-renders");
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);
  return <p style={{ color: `rgb(${r},${g},${b})` }}>child</p>;
};

const ChildMemo = React.memo(Child);

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <h2>打开控制台，点击按钮</h2>

      <button onClick={onClick}>点击 {state}</button>
      <p>未被React.memo()包裹，组件会重新渲染，字体颜色会改变</p>
      <Child />
      <p>被React.memo()包裹，组件不会重新渲染，字体颜色不会改变</p>
      {/* Child 组件被React.memo() 包裹，组件没拆分，也能阻止重新渲染 */}
      <ChildMemo />
    </>
  );
}
