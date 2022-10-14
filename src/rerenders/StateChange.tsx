import { useEffect, useState } from "react";

const App = () => {
  const [state, setState] = useState(0);

  const onClick = () => {
    setState(state + 1);
  };

  console.log("重新渲染次数: ", state);

  useEffect(() => {
    console.log("re-mount");
  }, []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>每次点击都会输出log，因为状态改变，页面重新渲染</p>
      <p>re-render count: {state}</p>
      <button onClick={onClick}>点击{state}次</button>
    </>
  );
};

export default App;
