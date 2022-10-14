import React, { useState, ReactNode } from "react";

const VerySlowComponent = () => {
  console.log("Very slow component re-renders");
  return <div>Very slow component</div>;
};

// 平铺写法，事件交互，会影响无关组件
const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  // 注意交互区域包含重组件，也就是重组件也参与交互，但不依赖变化的值
  return (
    <div onClick={onClick} style={{ background: "#dfa" }}>
      <p>Re-render count: {state}</p>
      <h3>平铺写法，事件交互，会影响无关组件</h3>
      <p>事件交互时，重组件也跟着re-render</p>
      <p>注意交互区域包含重组件，也就是重组件也参与交互，但不依赖变化的值</p>
      <VerySlowComponent />
    </div>
  );
};

const ComponentWithClick = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  // 把重组件从其父级组件中去除，适用children代替其位置，通过children展示重组件
  return (
    <div onClick={onClick} style={{ background: "#afd" }}>
      <p>Re-render count: {state}</p>
      {children}
    </div>
  );
};

const SplitComponent = () => {
  return (
    <>
      <ComponentWithClick>
        <>
          <h3>
            把重组件从其父级组件中去除，用children代替其位置，通过children展示重组件
          </h3>
          <p>点击交互区域，重组件不再re-render</p>

          <VerySlowComponent />
        </>
      </ComponentWithClick>
    </>
  );
};

export default function App() {
  return (
    <>
      <h2>打开控制台，点击按钮</h2>

      <FullComponent />
      <hr />
      <SplitComponent />
    </>
  );
}
