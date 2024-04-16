// ./components/Routes.js
import React from "react";
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";
import Header from "./Header"
import Home from "./Home";
import About from "./About";
import Topics from "./Topics";

export default function Routes() {
    return (
        <Router>
            <Header /> 
            <Switch>
                <Route exact ="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </Switch>
        </Router>
    )
}

/*
1. react-router-dom 에서 Router 와 Route 를 import 한다.
2. path 와 component 는 Route 의 속성중 하나이다.
3. 화면에 보여줄 component를 값으로 준다.
4. path에는 url 주소를 작성한다.
5. <Route path=" url주소" component={화면에 보여줄 컴포넌트 } /> ⇒ About 컴포넌트의 url 주소는 "/about" 이다.
6. <Router> 안에 <Header> 를 넣어 주어야 한다.

[exact]
exact 는 주어진 경로와 정확히 일치해야 설정한 컴포넌트를 보여준다.

[switch]
( 순서, 위치의 중요)
비교할 라우트를 더 상단에 작성해야 한다.
아래의 순서로 작성하면 중복되지 않고 클릭한 링크로만 이동하게 된다

[공식문서]
React Router : https://reactrouter.com/en/6.22.3/start/tutorial
*/