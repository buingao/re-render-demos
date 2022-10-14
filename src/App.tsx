import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import StateChange from "./rerenders/StateChange";
import ParentRerender from "./rerenders/ParentRerender";
import ContextProvider from "./rerenders/ContextProvider";
import HookChange from "./rerenders/HookChange";
import PropsChange from "./rerenders/PropsChange";
import DynamicCreate from "./rerenders/DynamicCreate";

import DownState from "./splitcomponents/DownState";
import ChildrenAsProps from "./splitcomponents/ChildrenAsProps";
import ComponentAsProps from "./splitcomponents/ComponentAsProps";

import SimpleNoProps from "./memo/Simple";
import ChildWithProps from "./memo/ChildWithProps";
import ChildAsPropsOrChildren from "./memo/ChildAsPropsOrChildren";

import Scene1 from "./usememohook/Scene1";
import Scene2 from "./usememohook/Scene2";
import Scene3 from "./usememohook/Scene3";
import Scene4 from "./usememohook/Scene4";

import StaticList from "./list/StaticList";
import DynamicList from "./list/DynamicList";
import BadRandomKeyList from "./list/BadRandomKeyList";

import Memo from "./context/Memo";
import SepDataAPI from "./context/SepDataAPI";
import Chunk from "./context/Chunk";
import Selector from "./context/Selector";

import "./App.css";

function Layout() {
  return (
    <div className="content">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul className="menu">
          <li>
            <Link to="/re-render/state-change">状态改变</Link>
          </li>
          <li>
            <Link to="/re-render/parent-rerender">
              父级组件重新渲染向下影响
            </Link>
          </li>
          <li>
            <Link to="/re-render/context-provider">
              context provider value变化
            </Link>
          </li>
          <li>
            <Link to="/re-render/hook-change">hook change</Link>
          </li>
          <li>
            <Link to="/re-render/props-change">props change</Link>
          </li>
          <li>
            <Link to="/re-render/dynamic-create">
              [BAD] 在渲染函数中创建组件
            </Link>
          </li>
        </ul>
        <hr />
        <ul className="menu">
          <li>
            <Link to="/split/down-state">拆分组件</Link>
          </li>
          <li>
            <Link to="/split/children-as-props">
              使用children代替重组件位置
            </Link>
          </li>
          <li>
            <Link to="/split/component-as-props">重组件作为props传入</Link>
          </li>
        </ul>
        <hr />
        <ul className="menu">
          <li>
            <Link to="/memo/simple-no-props">无 props 组件被memo</Link>
          </li>
          <li>
            <Link to="/memo/child-with-props">子组件复杂类型props</Link>
          </li>
          <li>
            <Link to="/memo/child-as-props-or-children">
              memo父或子，子作为props/children
            </Link>
          </li>
        </ul>
        <hr />
        <ul className="menu">
          <li>
            <Link to="/usememo/scene-1">[BAD] 仅 memorize props</Link>
          </li>
          <li>
            <Link to="/usememo/scene-2">子组件复杂类型props</Link>
          </li>
          <li>
            <Link to="/usememo/scene-3">处理hook依赖</Link>
          </li>
          <li>
            <Link to="/usememo/scene-4">昂贵计算</Link>
          </li>
        </ul>
        <hr />
        <ul className="menu">
          <li>
            <Link to="/list/static-list">static list</Link>
          </li>
          <li>
            <Link to="/list/dynamic-list">dynamic list</Link>
          </li>
          <li>
            <Link to="/list/bad-random-key-list">[BAD] random key list</Link>
          </li>
        </ul>
        <hr />
        <ul className="menu">
          <li>
            <Link to="/context/memo">Context Memo</Link>
          </li>
          <li>
            <Link to="/context/sep-data-api">Context Data&Api</Link>
          </li>
          <li>
            <Link to="/context/chunk">Context Chunk</Link>
          </li>
          <li>
            <Link to="/context/selector">Context Selector</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/re-render/state-change" element={<StateChange />} />
        <Route path="/re-render/parent-rerender" element={<ParentRerender />} />
        <Route
          path="/re-render/context-provider"
          element={<ContextProvider />}
        />
        <Route path="/re-render/hook-change" element={<HookChange />} />
        <Route path="/re-render/props-change" element={<PropsChange />} />
        <Route path="/re-render/dynamic-create" element={<DynamicCreate />} />
        <Route path="/split/down-state" element={<DownState />} />
        <Route path="/split/children-as-props" element={<ChildrenAsProps />} />
        <Route
          path="/split/component-as-props"
          element={<ComponentAsProps />}
        />
        <Route path="/memo/simple-no-props" element={<SimpleNoProps />} />
        <Route path="/memo/child-with-props" element={<ChildWithProps />} />
        <Route
          path="/memo/child-as-props-or-children"
          element={<ChildAsPropsOrChildren />}
        />
        <Route path="/usememo/scene-1" element={<Scene1 />} />
        <Route path="/usememo/scene-2" element={<Scene2 />} />
        <Route path="/usememo/scene-3" element={<Scene3 />} />
        <Route path="/usememo/scene-4" element={<Scene4 />} />
        <Route path="/list/static-list" element={<StaticList />} />
        <Route path="/list/dynamic-list" element={<DynamicList />} />
        <Route
          path="/list/bad-random-key-list"
          element={<BadRandomKeyList />}
        />
        <Route path="/context/memo" element={<Memo />} />
        <Route path="/context/sep-data-api" element={<SepDataAPI />} />
        <Route path="/context/chunk" element={<Chunk />} />
        <Route path="/context/selector" element={<Selector />} />
      </Route>
    </Routes>
  );
}
