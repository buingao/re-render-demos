import { useState } from "react";

const VerySlowComponent = () => {
  console.log("Very slow component re-render");
  return <div>Very slow component</div>;
};

// 事件交互与重组件平铺在同一个父组件
const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <h3>一般写法，平铺在一起</h3>
      <p>事件交互时，影响重组件也跟着一起re-render</p>
      <p>re-render count: {state}</p>
      <button onClick={onClick}>点击</button>
      <VerySlowComponent />
    </>
  );
};

// 拆分组件一，事件交互部分组件，内聚
const ComponentWithButton = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <p>re-render count: {state}</p>
      <button onClick={onClick}>点击</button>
    </>
  );
};

// 拆分后组件，包含两个子组件
const SplitComponent = () => {
  return (
    <>
      <h3>拆分后组件，包含两个子组件：交互组件 & 重组件</h3>
      <p>事件交互时，只有交互组件会re-render，重组件不受影响</p>
      <ComponentWithButton />
      <VerySlowComponent />
    </>
  );
};

export default function App() {
  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <p>平铺代码</p>
      <FullComponent />
      <hr />
      <p>拆分代码</p>
      <SplitComponent />
    </>
  );
}
