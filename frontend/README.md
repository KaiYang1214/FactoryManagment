### 專案架構
專案基礎架構使用 *React 16.9* hooks，如果你不知道怎麼使用 hooks 可以先參考[官方文件](https://reactjs.org/docs/hooks-intro.html)，
UI基礎使用 [ant-design](https://ant.design/docs/react/introduce) 一樣好好的熟讀文件。
專案打包使用 [webpack 4](https://webpack.js.org/)，使用 [styled-component](https://www.styled-components.com/) 來編輯元件的 css。

### 專案資料夾
```
.
├── .browserslistrc
├── .editorconfig
├── .eslintrc
├── .gitignore
├── LICENSE
├── README.md
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── components // 全區共用元件放這
│   ├── containers // 頁面放這邊
│   ├── hooks // 客製化 hooks 放這邊
│   ├── index.html
│   ├── index.js // 程式進入點
│   ├── locales // 多國語放這
│   ├── static
│   │   ├── icons // icon
│   │   └── images // 普通圖片
│   ├── store // context
│   ├── theme // ant theme
│   └── utils
└── webpack.config.js
```

### 共同遵守
讓我們團隊開發程式的寫法保持一致，如果寫法不一樣，未來加入的人會很辛苦，所以務必遵守。

1. React 元件使用 Functional-Component
   ```
   // 不要這樣
   class Comp extends React.Component{}

   // 請這樣
   const Comp = (props) => {}
   ```
2. 務必要寫 PropTypes
3. 盡量不使用 for loop 使用 functional programming
   ```
   // 不要這樣
   for(let i=0; i<length; i++){}
   
   // 請這樣
   array.forEach(()=>{})
   array.map(()=>{})
   array.filter(()=>{})
   array.reduce(()=>{})
   ```
4. 不用 redux / mobx 使用 react 內建的 context api
5. 要加入套件，需要大家同意，不要私自加入肥大的套件
6. 盡量使用 styled-component 不要自己寫 .css 檔案

### 呼叫 API
呼叫 api 的部分有寫一個 hook 放在 `src/hooks/useAxios.js`，使用方法如下。
```javascript
const Comp = () => {
  const defaultResponse = [1,2,3];
  // 可以自訂義初始的 response ，這樣畫面資料就不會崩潰
  const queryCount = useAxios(defaultResponse);
  // config 請參考 axios 的 config 完全一樣，避免學習曲線提升
  const queryCountConfig = {method: 'post', url: '/query/count', data: { a:123 } };

  useEffect(()=>{
    queryCount.exec(queryCountConfig);
  },[]);

  return(
    <div>
    {
      queryCount.isLoading 
        ? <div> loading </div> 
        : queryCount.response.map(d=><div key={d}>{d}</div>)
    }
    </div>
  )
}
```

### 我想講一下特別優化的地方
我把一些會造成系統肥大的地方優化，所以你們先看過，之後遇到問題才知道可能是改了這些地方的關係。
1. moment 語系檔很肥大，而且裡面幾乎都是我們用不到的國家的語言，所以我只留下簡中繁中英文三種語言，[參考這邊設定](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack)
2. antd 按需加載，如果整包 antd 引入會很肥大，使用`babel-import-plugin`只載入需要的 js 跟 less
3. 因為大家都不遵守 eslint 規則，我認為這是開發非常重要的事情，團隊的 Coding Style 必須統一，所以加入了 [husky](https://github.com/typicode/husky) 套件，如果你 `git commit` 失敗了，要檢查一下 eslint 有沒有全過，才能夠成功 commit
4. [antd 全域 less theme](https://ant.design/docs/react/customize-theme)，因為整個antd佈景主題顏色統一修改比較方便，我抽到了`src/theme/theme.json` 這邊，修改完畢以後重新啟動 server 才會有效果。
5. webpack 打包出來的檔案名稱 `ProjectList.a27cb36.js` 前面是 chunkName 後面是 commit id，記得在動態載入的時候要指定 webpackChunkName，例如`const Login = lazy(() => import("@/containers/Login" /* webpackChunkName:"Login" */));`

### 環境變數
因為我們最少會有三個環境，`DEV` ｜ `QT` ｜ `PRD` 所以要制定環境變數寫入 gitlab 的 cicd 變數裡面，打包的時候 webpack 會把環境變數拿進 js 裡面當成變數使用，達到同一包可以運行在不同環境的需求。

```bash
export FRONTEND='{"API_URL":"https://winerve2npidev.wistron.com/","DASHBOARD_URL":"http://localhost:8080/","AAD_CLIENT_ID":"xxxxxxxxxxxxx","ENV":"DEV"}'
```
前端系統跑起來的時候會先看有沒有環境變數設定，如果沒有環境變數設定會拿 `src/utils/env.js` 裡面的設定來用。如果是本機跑就直接修改 env.js 就好。不用設定環境變數，放到 CI/CD 上面才要設定環境變數。

- API_URL: 系統打 api 的地址
- DASHBOARD_URL: 前端瀏覽器網址列應該顯示的地址
- AAD_CLIENT_ID: azure AD login 的 client id
- ENV: 目前環境
