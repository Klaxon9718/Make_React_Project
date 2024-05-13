import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Popup from './Popup';
import Alert from '@mui/material/Alert';

export default function AlertDialog(props) {
	const [insideD, setInsideD] = React.useState(false);
	const [isDeptPopup, setIsDeptPopup] = React.useState(false);

	const [empName, setEmpName] = React.useState('');
	const [dept, setDept] = React.useState({ CODE: '', NAME: '' });
	const [mobile, setMobile] = React.useState('');
	const [pw1, setPw1] = React.useState('');
	const [pw2, setPw2] = React.useState('');

	const [isError, setIsError] = React.useState(false);
	const [isWrongPW, setIsWrongPw] = React.useState(false);

	const handleClose = () => {
		props.onClose();
	};

	const handleInsideDClose = () => {
		setInsideD(false);
		props.onClose();
	};

	// 팝업을 닫기 위한 범용 함수 // 고차 함수로 변경 
	const handleClosePopup = (setPopupState) => () => {
		setPopupState(false);
	};

	const handleOpenPopup = (setPopupState) => () => {
		setPopupState(true);
		console.log(isDeptPopup, "상태");
	};

	const handleSelectDept = (dept) => {
		setDept(dept);
		setIsDeptPopup(false);
	}

	//텍스트필드 값 변경
	const handleChange = (setter, key, event) => { //setter는 컴포넌트를 가짐
		setter(prevState => ({
			...prevState, //이전 상태 저장
			[key]: event.target.value //해당 키에 대한 값을 변경
		}));
	};

	const InsertEmp = async() => {

		console.log("신규 사원 저장 실행");
		//입력 값 확인
		if (!empName || !dept || !mobile || !pw1 || !pw2) {
			setIsError(true);
			return;
		}

		if (pw1 !== pw2) {
			setIsWrongPw(true);
			return;
		}

		const front = mobile.slice(-8, -4) + "-";
		const back = mobile.slice(-4);

		console.log(mobile, '-', front, "-", back);

		try {
			await axios.post('/test/personaolData', {
				'emp_code': '',
				'emp_name': empName,
				'dept_no': dept.CODE,
				'pw': pw1,
				'mobile': '010-' + front + back,
				'insEmp': sessionStorage.getItem('session_id')
			})
				.then(function (response) {
					setInsideD(true)
				})
				.catch(function (error) {
					console.error('Error occurred during AlertDialog processing:', error.message);
				})
		} catch (error) {
			console.error('Error occurred during AlertDialog processing:', error.message);
		}
	}


useEffect(() => {
	// console.log("사원 이름" , empName);
	// console.log("사원 전화번호" , mobile);
	// console.log("사원 전화번호" , pw1);
	// console.log("사원 전화번호" , pw2);
}, [empName, mobile, pw1, pw2]);

return (
	<React.Fragment>
		<Dialog
			open={props.isopen} // props에서 open 상태를 받음
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<DialogContent>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						{isError && <Alert severity="error">입력 값을 확인해주세요.</Alert>}
						{isWrongPW && <Alert severity="error">비밀번호가 일치하지 않습니다.</Alert>}
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							신규 사원 등록
						</Typography>
						<Box component="form" noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="given-name"
										name="firstName"
										required
										fullWidth
										id="firstName"
										label="이름"
										autoFocus
										onChange={(event) => setEmpName(event.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										label="부서"
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: dept.NAME ? true : false,
										}}
										value={dept.NAME}
										onClick={handleOpenPopup(setIsDeptPopup)}
										onChange={(event) => setDept(event)}
									/>
									{isDeptPopup && <Popup isopen={isDeptPopup} onClose={handleClosePopup(setIsDeptPopup)} labelCode={'부서코드'} labelName={'부서명'} tname={'Dept_Master'} calcode={'Dept_Code'} calname={'Dept_Name'} onSelect={handleSelectDept} />}
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label="휴대전화"
										onChange={(event) => { setMobile(event.target.value) }}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="new-password"
										onChange={(event) => { setPw1(event.target.value) }}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password 확인"
										type="password"
										id="password"
										autoComplete="new-password"
										onChange={(event) => { setPw2(event.target.value) }}
									/>
								</Grid>

							</Grid>
							<Button
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={InsertEmp}
							>
								사원 등록
							</Button>

						</Box>
					</Box>
				</Container>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>취소</Button>

				{/*확인 안내창 생성*/}
				{insideD && <Dialog open={insideD} onClose={handleInsideDClose}>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							저장되었습니다.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleInsideDClose}>확인</Button>
					</DialogActions>
				</Dialog>}
			</DialogActions>
		</Dialog>
	</React.Fragment>
);
}
