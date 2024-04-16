import Header from "./components/Header";
import About from "./components/About";
import Home from "./components/Home";
import Topics from "./components/Topics";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Topics" element={<Topics />} />
      </Routes>
    </div>
  );
}
export default App;

//[참고]
//https://velog.io/@sojeong0302/React-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%9D%BC%EC%9A%B0%ED%8C%85