import React, { useState, useMemo } from "react";

const Child = ({ data }: { data: { value: number } }) => {
  console.log("Child re-render:", data.value);
  return <p>{data.value}</p>;
};
const ChildMemo = React.memo(Child);

const values = [1, 2, 3];

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  console.log("当前组件re-render");

  const items = useMemo(() => {
    return values.map((val) => <Child data={{ value: val }} key={val} />);
  }, []);

  const vals = useMemo(() => {
    return values.map((val) => ({
      value: val,
    }));
  }, []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>
        使用useMemo记忆子组件列表，不用分别使用memo记忆子组件，useMemo记忆props
        value值
      </p>

      <button onClick={onClick}>改变 {state}，当前组件重渲染</button>

      {/* 1、使用useMemo记忆整体列表，不会重新渲染 */}
      {items}

      {/* 2、使用memo记忆组件，使用useMemo记忆对象类型props，不会重新渲染 */}
      {values.map((val, index) => (
        // <ChildMemo data={vals[index]} key={val} />

        // 3、未使用useMemo记忆对象类型props，重新渲染
        <ChildMemo data={{ value: val }} key={val} />
      ))}
    </>
  );
}
