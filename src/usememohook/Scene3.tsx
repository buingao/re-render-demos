import React, { useState, useMemo, useEffect } from "react";

export default function App() {
  const val = { value: "not memoized" };
  const memoValue = useMemo(() => ({ value: "memoized" }), []);
  const [value] = useState({ value: "not memoized" });
  const [state, setState] = useState(0);

  const onClick = () => {
    setState(state + 1);
  };

  useEffect(() => {
    console.log("我被memo，再点你也看不见我");
  }, [memoValue]);

  useEffect(() => {
    console.log("我在state, 一样看不见我");
  }, [value]);

  useEffect(() => {
    console.log("val 我比较可爱，一点我就出来啦");
  }, [val]);

  return (
    <>
      <h2>打开控制台，点击按钮</h2>

      <button onClick={onClick}>点击了{state}次</button>
    </>
  );
}
