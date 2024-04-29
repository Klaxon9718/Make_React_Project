import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CssBaseline, Container, createTheme, ThemeProvider, Alert } from '@mui/material';
import * as LoginComponents from 'src/pages/components/LoginComponents';
import * as Home from 'src/pages/Home'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



function SignIn() {
	const [inputId, setInputId] = useState('')
	const [inputPw, setInputPw] = useState('')
	const [noLogin, setNoLogin] = useState(false); // 로그인 상태 확인 함수
	const navigate = useNavigate(); // 로그인 성공 시, 경로 이동을 위한 함수

	//////////////////////////////////
	const [data, setData] = useState('')

	const fetchTodos = async () => {
		try {
			const response = await axios.get('/test/data');
			setData(response.data); // 받아온 데이터를 상태에 저장
			console.log(data); // 콘솔에 데이터 출력
		} catch (error) {
			console.error('데이터를 불러오는 데 실패했습니다.', error);
		}
	};

	//https://velog.io/@chaeshee0908/React-Axios%EB%A1%9C-User-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%9B%EC%95%84-%EC%B6%9C%EB%A0%A5%ED%95%98%EA%B8%B0
	// 페이지 렌더링 후 가장 처음 호출되는 함수
	useEffect(() => {
		fetchTodos();
	}, []);

	//////////////////////////////////

	//input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다.
	const handleInputId = (e) => {
		setInputId(e.target.value)
	}

	const handleInputPw = (e) => {
		setInputPw(e.target.value)
	}

	//로그인 정보 submit
	const handleSubmit = async (event) => {

		// const data = new FormData(event.currentTarget);

		// console.log({
		// 	email: data.get('email'),
		// 	password: data.get('password'),
		// });

		handleInputId(event.currentTarget);
		handleInputPw(event.currentTarget);

		//버튼만 누르면 리프레시 되는 것을 막아줌
		event.preventDefault();		

		await new Promise((r) => setTimeout(r, 0));

		const response = await axios.post('/test/01',{
			'id': inputId,
			'pw': inputPw
			})
		.then(function (response) {
			//console.log("로그인 상태 " + response.status);

			if(response.status == "200") {
				navigate("/home"); // "/home"으로 페이지 이동
			}
			
		})
		.catch(function (error) {
			console.error('Error occurred during login processing:', error.message);
                setNoLogin(true); // 로그인 실패 상태를 true로 설정
				setTimeout(()=>setNoLogin(false), 1500); //2초 후 안내창 삭제
		});
	};

	const defaultTheme = createTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{noLogin && <Alert severity="error" >로그인 정보를 확인해 주세요.</Alert>}
				<LoginComponents.LoginSection getHandleSubmit={handleSubmit} getHandleInputId={handleInputId} getHandleInputPw={handleInputPw} />
				<LoginComponents.Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}

export default SignIn;