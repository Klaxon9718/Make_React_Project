import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import Popup from 'src/pages/ship/components/Popup';
import Drawer from 'src/pages/ship/components/Drawer';
import Dialog from 'src/pages/ship/components/Dialog';
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
//#endregion

export default function Ship() {

	const defaultTheme = createTheme(); // 테마 적용

	const [empCode, setEmpCode] = useState('');
	const [empName, setEmpName] = useState('');
	const [cboDept, setCboDept] = useState([]);
	const [selectedDept, setSelectedDept] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [pw1, setPw1] = React.useState('');
	const [pw2, setPw2] = React.useState('');


	const states = [
		{ value: 'alabama', label: 'Alabama' },
		{ value: 'new-york', label: 'New York' },
		{ value: 'san-francisco', label: 'San Francisco' },
		{ value: 'los-angeles', label: 'Los Angeles' },
	];

	const user = {
		name: 'Sofia Rivers',
		avatar: '/assets/avatar.png',
		jobTitle: 'Senior Developer',
		country: 'USA',
		city: 'Los Angeles',
		timezone: 'GTM-7',
	}

	useEffect(() => {

	}, []);

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
												<Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
											</div>
											<Stack spacing={1} sx={{ textAlign: 'center' }}>
												<Typography variant="h5">{user.name}</Typography>
												<Stack direction="row" spacing={1} alignItems="center">
													<Typography color="text.secondary" variant="body2">
														사원 번호 :
													</Typography>
													<Typography color="text.secondary" variant="body2">
														{user.timezone}
													</Typography>
												</Stack>
											</Stack>
										</Stack>
									</CardContent>
									<Divider />
									<CardActions>
										<Button fullWidth variant="text" sx={{ color: 'red', fontWeight: 'bold' }}>
											delete account
										</Button>
									</CardActions>
								</Card>

							</Grid>
							<Grid lg={8} md={6} xs={12}>
								<form
									onSubmit={(event) => {
										event.preventDefault();
									}}
								>
									<Card>
										<CardHeader subheader="개인정보를 수정할 수 있습니다." title="Profile" />
										<Divider />
										<CardContent>
											<Grid container spacing={3}>
												<Grid md={2} xs={12}>
													<FormControl fullWidth required>
														<InputLabel>사원 명</InputLabel>
														<OutlinedInput defaultValue="Rivers" label="Last name" name="lastName" />
													</FormControl>
												</Grid>
												<Grid md={2} xs={12}>
													<FormControl fullWidth required>
														<InputLabel>부서</InputLabel>
														<Select defaultValue="New York" label="State" name="state" variant="outlined">
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
														<OutlinedInput defaultValue="sofia@devias.io" label="Email address" name="email" />
													</FormControl>
												</Grid>
												<Grid md={6} xs={12}>
													<FormControl fullWidth>
														<InputLabel>전화번호</InputLabel>
														<OutlinedInput label="Phone number" name="phone" type="tel" />
													</FormControl>
												</Grid>

												<Grid md={6} xs={12}>
													<FormControl fullWidth>
														<InputLabel>비밀번호</InputLabel>
														<OutlinedInput defaultValue="Sofia" label="비밀번호" type="password" name="firstName" />
													</FormControl>
												</Grid>
												<Grid md={6} xs={12}>
													<FormControl fullWidth>
														<InputLabel>비밀번호 확인</InputLabel>
														<OutlinedInput defaultValue="Sofia" label="비밀번호 확인" type="password" name="firstName" />
													</FormControl>
												</Grid>
											</Grid>
										</CardContent>
										<Divider />
										<CardActions sx={{ justifyContent: 'flex-end' }}>
											<Button variant="contained">수정사항 저장</Button>
										</CardActions>
									</Card>
								</form>
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