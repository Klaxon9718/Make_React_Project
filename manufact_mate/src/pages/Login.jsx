import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import * as LoginComponents from 'src/pages/components/LoginComponents';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



function SignIn() {
	const [inputId, setInputId] = useState('')
	const [inputPw, setInputPw] = useState('')
	const [loginCheck, setLoginCheck] = useState(false);
	const navigate = useNavigate();		//성공 시 이동 경로

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

		await new Promise((r) => setTimeout(r, 1000));

		const response = await axios.post('/test/01',{
			'id': inputId,
			'pw': inputPw
			})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log("Login.jsx handleSubmit : " + error);
		});
	};

	const defaultTheme = createTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<LoginComponents.LoginSection getHandleSubmit={handleSubmit} getHandleInputId={handleInputId} getHandleInputPw={handleInputPw} />
				<LoginComponents.Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}

export default SignIn;