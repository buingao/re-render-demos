import { useState } from "react";

const Child = () => {
  console.log("子组件 re-render，字体颜色改变");
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);
  return <p style={{ color: `rgb(${r},${g},${b})` }}>child</p>;
};

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  console.log("当前组件re-render 次数: ", state);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>每次点击都会输出log，因为状态改变，页面重新渲染</p>
      <Child />
      <button onClick={onClick}>点击{state}</button>
    </>
  );
};

export default App;
