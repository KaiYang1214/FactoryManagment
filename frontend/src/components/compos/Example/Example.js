/**
 * 這是用來教各位怎麼做 unit test 的元件
 * 因為卡到目前網路上還沒有一個有效的方式可以測試 React 所以先提出一個可行作法，目前先用看看
 * 請不要使用 import React, {useState} from 'react'; 因為在 mock hooks 的時候會噴錯
 */
import React from 'react';
import { Button } from 'antd';
import useAxios from '@/hooks/useAxios';

/**
 * 邏輯層
 * 我把邏輯跟畫面抽開，我們可以單獨對邏輯層做測試
 */
export const exampleHooks = () => {
  const [count, setCount] = React.useState(9);
  const queryExample = useAxios(['asdfasdf', '0909090909']);
  const onButtonClick = () => {
    setCount(count + 1);
  };
  const initData = async () => {
    const config = { url: '/example', method: 'get' };
    const data = await queryExample.exec(config);
    console.log('======execute api query success======', data);
  };
  // 元件渲染以後會去打 api 取得資料
  React.useEffect(() => { initData(); }, []);
  return { count, onButtonClick, queryExample };
};

/**
 * 顯示層
 * 因為 enzyme@3.10 目前沒有辦法 shallow functional component 取得 instance
 * 所以只好把 hooks 抽出，另外從 function 內部外露
 */
const Example = () => {
  const state = exampleHooks();
  Example.state = state;
  return (
    <div>
      <div>{state.count}</div>
      <Button onClick={state.onButtonClick}>add count</Button>
      {
        state.queryExample.isLoading
          ? 'isLoading......'
          : state.queryExample.response.map((d) => (<div key={d}>{d}</div>))
      }
    </div>
  );
};

export default Example;
