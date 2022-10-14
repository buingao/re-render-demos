import React, { useState, useMemo, ReactNode } from "react";

const Child = ({ data }: { data: { value: string } }) => {
  console.log("Child re-renders", data.value);
  return <p>{data.value}</p>;
};

const ChildMemo = React.memo(Child);

const Parent = ({
  left,
  children,
}: {
  children: ReactNode;
  left?: ReactNode;
}) => {
  // parent一直都会re-render
  console.log("parent re-render");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <aside style={{ background: "#abc", marginRight: "16px" }}>{left}</aside>
      <main style={{ background: "#cba" }}>{children}</main>
    </div>
  );
};

const ParentMemo = React.memo(Parent);

export default function App() {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const memoValue = useMemo(() => ({ value: "memoized data" }), []);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>
      <button onClick={onClick}>点击</button>

      <p>memoized 父，未 memoized 子 将 re-render</p>
      {/* 父memo，子未memo，作为props和children */}
      <ParentMemo left={<Child data={{ value: "left child of ParentMemo" }} />}>
        <Child data={{ value: "child of ParentMemo" }} />
      </ParentMemo>

      <p>
        未Memoized父，Memoized 子 将不会
        re-render；适用上一条原则，要React.memo生效，props需被记忆
      </p>
      {/* 父未memo，子memo，作为props和children */}
      <Parent left={<ChildMemo data={memoValue} />}>
        <ChildMemo data={memoValue} />
      </Parent>
    </>
  );
}
