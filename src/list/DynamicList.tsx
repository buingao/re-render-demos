import React, { useState } from "react";

const Child = ({ value }: { value: string }) => {
  console.log("Child re-renders", value);
  return <div>{value}</div>;
};

const values = [3, 1, 2];

const ChildMemo = React.memo(Child);

export default function App() {
  const [state, setState] = useState<"ascend" | "descend">("ascend");

  const onClick = () => {
    setState(state === "ascend" ? "descend" : "ascend");
  };

  const sortedValues =
    state === "ascend" ? values.sort() : values.sort().reverse();

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>动态列表，分别使用id value和index作为key</p>
      <p>index作为key的组件会重渲染，value作为key的组件不会</p>

      <button onClick={onClick}>切换排序 {state}</button>

      {/* 借助React Developer Tools观察组件 */}

      {/* 切换排序状态，只有index 0、2 会重渲染，因为key=0的组件，切换状态前后value发生了变化，会重新渲染 */}
      {sortedValues.map((val, index) => (
        <ChildMemo value={`Child of index: ${val}`} key={index} />
      ))}

      {/* 同一个组件，props（key/value）都没有改变，状态改变前后还是同一个组件，组件只是发生了移动，并未重新渲染 */}
      {sortedValues.map((val, index) => (
        <ChildMemo value={`Child of id: ${val}`} key={val} />
      ))}
    </>
  );
}
