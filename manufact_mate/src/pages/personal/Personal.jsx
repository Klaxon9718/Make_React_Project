import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from 'src/pages/personal/component/Dialog';
import { useNavigate } from "react-router-dom";

//#region MUI속성
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Bar from 'src/pages/section/Bar'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
//#endregion

export default function Ship() {

	const navigate = useNavigate(); //#region 사용자 세션처리

	const chk_session = () => {
		if (sessionStorage.getItem('session_id') === null) {
			sessionStorage.clear();
			navigate("/login"); // "/login"으로 이동
		}
	}

	const defaultTheme = createTheme(); // 테마 적용

	const [empCode, setEmpCode] = useState('');
	const [empName, setEmpName] = useState('');
	const [showEmpName, setshowEmpName] = useState('');
	const [selectedDept, setSelectedDept] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [pw1, setPw1] = React.useState('');
	const [pw2, setPw2] = React.useState('');

	const [isWrongPW, setIsWrongPw] = React.useState(false);
	const [isSave, setIsSave] = React.useState(false);
	const [isDialog, setIsDialog] = React.useState(false);

	const states = [
		{ value: 'admin', label: 'admin' },
		{ value: 'CT_AD', label: '총무/회계팀' },
		{ value: 'CT_CEO', label: '대표이사실' },
		{ value: 'CT_MD', label: '생산팀' },
		{ value: 'CT_PD', label: '구매팀' },
		{ value: 'CT_QD', label: '품질팀' },
		{ value: 'CT_RD', label: '연구소' },
		{ value: 'CT_SD', label: '영업팀' },
	];

	function ClickLogoutBtn () {
		sessionStorage.clear();
		navigate("/login"); // "/login"으로 이동
	}

	////////////////////////////////////////////////////////
	function ClickDeleteBtn(){
		setIsDialog(true);
	}

	//사원 정보 수정
	const ClickSaveButton = async() => {
		console.log("저장 값 empName", empName)

		if (pw1 !== pw2) {
			setIsWrongPw(true);
			return;
		}

		await axios.post('/test/personaolData', {
			'emp_code': empCode,
			'emp_name': empName,
			'dept_no': selectedDept,
			'email': email,
			'mobile': mobile,
			'pw': pw1,
			'INS_EMP': sessionStorage.getItem('session_id')
		}).then(function (response) {
			setIsWrongPw(false);
			setIsSave(true);
		})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			})
	}


	//데이터 호출
	const empData = async () => {
		await axios.post('/test/selectPersonalData', {
			'emp_code': empCode
		}).then(function (response) {
			console.log("EMP_CODE 출력 : ", response.data);

			const [result] = response.data;
			console.log("EMP_CODE 출력 : ", result.EMP_NAME);
			setshowEmpName(result.EMP_NAME)
			setEmpName(result.EMP_NAME)
			setSelectedDept(result.DEPT_CODE)
			setMobile(result.MOBILE)
			setPw1(result.PW)
			setEmail(result.EMAIL)
		})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			})
	}

	useEffect(() => {
		chk_session();
		console.log("세션 아이디", sessionStorage.getItem('session_id'))
		setEmpCode(sessionStorage.getItem('session_id'));
		console.log("이름", empName)

		empData();
	}, [empCode, isDialog]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<Bar>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						height: { xs: 240, sm: 300, md: 360, lg: 800 },
						width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
					}}
				>


					<Stack spacing={3}>
						<div>
							<Typography variant="h4">Account</Typography>
						</div>
						<Grid container spacing={3}>
							<Grid lg={4} md={6} xs={12}>

								<Card>
									<CardContent>
										<Stack spacing={2} sx={{ alignItems: 'center' }}>
											<div>
												<Avatar sx={{ height: '80px', width: '80px' }} />
											</div>
											<Stack spacing={1} sx={{ textAlign: 'center' }}>
												<Typography variant="h5">{showEmpName}</Typography>
												<Stack direction="row" spacing={1} alignItems="center">
													<Typography color="text.secondary" variant="body2">
														사원 번호 :
													</Typography>
													<Typography color="text.secondary" variant="body2">
														{empCode}
													</Typography>
												</Stack>
											</Stack>
										</Stack>
									</CardContent>
									<Divider />
									<CardActions>
										<Button fullWidth onClick={ClickLogoutBtn}variant="text">
											로그아웃
										</Button>
										</CardActions>
										<CardActions>
										<Button fullWidth onClick={() => setIsDialog(true)}variant="text" sx={{ color: 'red', fontWeight: 'bold' }}>
											delete account
										</Button>
										{isDialog && <Dialog isopen={isDialog} onClose={() => {setIsDialog(false); sessionStorage.clear(); }} deleteList={[empCode]}/>}
									</CardActions>
								</Card>

							</Grid>
							<Grid lg={8} md={6} xs={12}>
								<Card>
									<CardHeader subheader="개인정보를 수정할 수 있습니다." title="Profile" />
									<Divider />
									<CardContent>
										<Grid container spacing={3}>
											<Grid md={2} xs={12}>
												<FormControl fullWidth required>
													<InputLabel>사원 명</InputLabel>
													<OutlinedInput
														value={empName} label="Email  " name="email"
														onChange={(e) => {
															console.log(e.target.value); // 입력값 로그로 확인
															setEmpName(e.target.value);
														}}
													/>

												</FormControl>
											</Grid>
											<Grid md={2} xs={12}>
												<FormControl fullWidth required>
													<InputLabel>부서</InputLabel>
													<Select value={selectedDept} label="Email" name="email" onChange={(e) => {
														console.log(e.target.value); // 입력값 로그로 확인
														setSelectedDept(e.target.value);
													}}>
														{states.map((option) => (
															<MenuItem key={option.value} value={option.value}>
																{option.label}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid>
											<Grid md={6}>

											</Grid>
											<Grid md={6} xs={12}>
												<FormControl fullWidth required>
													<InputLabel>이메일 주소</InputLabel>
													<OutlinedInput value={email} label="Email address" name="email" onChange={(e) => {
														console.log(e.target.value); // 입력값 로그로 확인
														setEmail(e.target.value);
													}} />
												</FormControl>
											</Grid>
											<Grid md={6} xs={12}>
												<FormControl fullWidth>
													<InputLabel>전화번호</InputLabel>
													<OutlinedInput value={mobile} label="Phone number" name="phone" type="tel" onChange={(e) => {
														console.log(e.target.value); // 입력값 로그로 확인
														setMobile(e.target.value);
													}} />
												</FormControl>
											</Grid>

											<Grid md={6} xs={12}>
												<FormControl fullWidth>
													<InputLabel>비밀번호</InputLabel>
													<OutlinedInput value={pw1} label="비밀번호" type="password" name="firstName" onChange={(e) => {
														console.log(e.target.value); // 입력값 로그로 확인
														setPw1(e.target.value);
													}} />
												</FormControl>
											</Grid>
											<Grid md={6} xs={12}>
												<FormControl fullWidth>
													<InputLabel>비밀번호 확인</InputLabel>
													<OutlinedInput label="비밀번호 확인" type="password" name="firstName" onChange={(e) => {
														console.log(e.target.value); // 입력값 로그로 확인
														setPw2(e.target.value);
													}} />
												</FormControl>
											</Grid>

											{isWrongPW && <Alert severity="error">비밀번호가 일치하지 않습니다.</Alert>}
											{isSave && <Alert severity="success">저장되었습니다.</Alert>}
										</Grid>
									</CardContent>
									<Divider />
									<CardActions sx={{ justifyContent: 'flex-end' }}>
										<Button variant="contained" onClick={ClickSaveButton}>수정사항 저장</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					</Stack>

				</Paper>
			</Bar>
		</ThemeProvider>

	);
}


/* ModalProps={{
	BackdropProps: {
	  invisible: true
	}
  }}
  drawer 사용시 뒤 활성화
  
	  const handleRowSelection = (selectionModel) => {
		if (selectionModel.length > 0) {
		  const selectedID = selectionModel[0]; // 여기서는 단일 선택을 가정합니다.
		  const selectedRow = rows.find(row => row.SHIP_NO === selectedID);
		  setSelectedRowData(selectedRow);
		  console.log(selectedRow); // 선택된 행의 데이터를 확인할 수 있습니다.
		}
	  };
 
 
  */