import Header from 'src/pages/section/Header';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import * as HomeCom from 'src/pages/Home/HomeComponents'

function Home() {

	//#region 사용자 세션처리
	const navigate = useNavigate();

	const chk_session = () => {
		if (sessionStorage.getItem('session_id') === null ){
			sessionStorage.clear();
			navigate("/login"); // "/login"으로 이동
		}
	}
	//#endregion

	React.useEffect(() => {
		chk_session();
	  }, []); // 빈 배열을 

  return (
    <div>
      <Header />
		<HomeCom.default />
      창대한 인사말
    </div>
  );
}

export default Home;