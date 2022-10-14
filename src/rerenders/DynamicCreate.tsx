import { useState, useEffect } from "react";

const Component = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  // 每次渲染时，都会创建这个重组件，性能很差
  const VerySlowComponent = () => {
    console.log("Very slow component re-renders");

    useEffect(() => {
      console.log("Very slow component re-mounts");
    }, []);

    return <div>Very slow component</div>;
  };

  return (
    <>
      <button onClick={onClick}>点击</button>
      <VerySlowComponent />
    </>
  );
};

const App = () => {
  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>每次点击，重组件都会重新挂载</p>

      <Component />
    </>
  );
};

export default App;
