import React, { useEffect, useState } from "react";

const Child = ({ value }: { value: number }) => {
  console.log("Child re-renders", value);
  return <li>{value}</li>;
};

// const ChildMemo = Child;
// memo子组件
const ChildMemo = React.memo(Child);

const values = [1, 2, 3];

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  console.log("父级组件由于state变化，re-render");

  useEffect(() => {
    console.log("父级组件 re-mount");
  }, []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>静态列表，分别使用value和index作为key，都可以的</p>
      <p>子组件都不会重渲染</p>

      <button onClick={onClick}>点击 {state}</button>

      <ul>
        {values.map((val, index) => (
          <ChildMemo value={val} key={index} />
        ))}
      </ul>
      <ol>
        {values.map((val) => (
          <ChildMemo value={val} key={val} />
        ))}
      </ol>
    </>
  );
}
