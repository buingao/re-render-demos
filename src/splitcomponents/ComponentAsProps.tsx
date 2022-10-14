import { useState, ReactNode } from "react";

const VerySlowComponent = () => {
  console.log("Very slow component re-renders");
  return <div>Very slow component</div>;
};

const AnotherSlowComponent = () => {
  console.log("Another slow component re-renders");
  return <div>Another slow component</div>;
};

const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} style={{ background: "#19b" }}>
      <h3>糟糕的写法</h3>
      <p>点击交互，重组件re-render</p>
      <p>Re-render count: {state}</p>
      <VerySlowComponent />
      <p>Something</p>
      <p>Something</p>
      <p>Something</p>
      <AnotherSlowComponent />
    </div>
  );
};

const ComponentWithClick = ({
  upup,
  down,
}: {
  upup: ReactNode;
  down: ReactNode;
}) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} style={{ background: "#b19" }}>
      <p>Re-render count: {state}</p>
      {upup}
      <p>Something</p>
      <p>Something</p>
      <p>Something</p>
      {down}
    </div>
  );
};

const SplitComponent = () => {
  const up = (
    <>
      <h3>交互区域内部的多个不连续重组件，被当作props分别传入</h3>
      <p>交互时，重组件不再随着re-render</p>

      <VerySlowComponent />
    </>
  );

  const down = <AnotherSlowComponent />;

  return (
    <>
      <ComponentWithClick upup={up} down={down} />
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
