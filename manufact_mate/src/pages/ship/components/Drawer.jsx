import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function BottomDrawer(props) {

	const [cboShip, setCboShip] = React.useState([]);	//cbo리스트를 받아와 배열로 저장
	const [cboOrder, setCboOrder] = React.useState([]); //cbo리스트를 받아와 배열로 저장
	const [selectedCboShip, setSelectedCboShip] = React.useState({ CODE: '', NAME: '' }); //cbo 선택시 값 저장
	const [selectedCboOrder, setSelectedCboOrder] = React.useState({ CODE: '', NAME: '' }); //cbo 선택시 값 저장

	const [dteShip, setDteShip] = React.useState(dayjs()); //날짜
	const [dteDeli, setDteDeli] = React.useState(dayjs()); //날짜

	const defaultTheme = createTheme(); // 테마 적용

	//텍스트필드 값 변경
	const handleChange = (setter, key, event) => { //setter는 컴포넌트를 가짐
		setter(prevState => ({
			...prevState, //이전 상태 저장
			[key]: event.target.value //해당 키에 대한 값을 변경
		}));
	};

	// 수주 콤보박스 리스트 가져옴
	const fetchShipOptions = async () => {
		try {
			const response = await axios.post('/test/addCboShipList');
			setCboShip(response.data); // 콤보박스 상태 업데이트
		} catch (error) {
			console.error('Error fetching ship options:', error);
		}
	};

	//주문유형 콤보박스 리스트 가져옴
	const fetchOrderOptions = async () => {
		try {
			const response = await axios.post('/test/addCboOrderList');
			setCboOrder(response.data); // 콤보박스 상태 업데이트
		} catch (error) {
			console.error('Error fetching order options:', error);
		}
	};

	useEffect(() => {
		fetchShipOptions();
		fetchOrderOptions();
	}, []);


	return (
		<ThemeProvider theme={defaultTheme}>
			<Drawer anchor={'bottom'} open={props.isopen} onClose={props.onClose}>
				<Box sx={{ flexGrow: 1, display: 'flex', width: '100%', height: { xs: 100, sm: 150, md: 250, lg: 300 } }} role="presentation">
					<Paper sx={{ display: 'flex', width: '100%', }} square={false} elevation={3}>

						<Grid container align="center" spacing={1} xs={12}  > {/*전체*/}

							<Grid sx={{ mt: 2, ml: 1 , display: 'flex'}} xs={10} container align="center" direction="row"  > {/*왼쪽*/}
							
								<Grid container direction="row" xs={8} sx={{ mt: 2,ml: 2 }}>
									<Grid item xs={2}>
										<TextField id="ship_no" label="수주번호" variant="outlined" size="small" InputProps={{ readOnly: true, }} />
									</Grid>

									<Grid item xs={2}>
										<FormControl fullWidth >
											<InputLabel id="demo-simple-select-label" sx={{ mt: -1, }} >수주구분</InputLabel>
											<Select
												value={selectedCboShip.CODE || ''}
												label="수주구분"
												onChange={(event) => handleChange(setSelectedCboShip, 'CODE', event)}
												size={"small"}
												sx={{ width: 140, ml: 1 }}
											>
												{cboShip.map((option) => (
													<MenuItem key={option.CODE} value={option.CODE}>
														{option.NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={2} >
										<FormControl fullWidth >
											<InputLabel id="demo-simple-select-label" sx={{ mt: -1, }}>주문유형</InputLabel>
											<Select
												value={selectedCboOrder.CODE || ''}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												onChange={(event) => handleChange(setSelectedCboOrder, 'CODE', event)}
												size={"small"}
												sx={{ width: 120 }}
											>
												{cboOrder.map((option) => (
													<MenuItem key={option.CODE} value={option.CODE}>
														{option.NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>
								</Grid>


								<Grid sx={{ ml: 1, mt: 1 }} xs={8} container direction="row">
									<TextField id="ship_no" label="거래처코드" variant="outlined" size="small" sx={{ ml: 1 }} />
									<TextField id="ship_no" label="거래처명" variant="outlined" size="small" InputProps={{ readOnly: true, }} sx={{ ml: 1, }} />
									<TextField id="ship_no" label="품목 코드" variant="outlined" size="small" InputProps={{ readOnly: true, }} sx={{ ml: 1,}} />
									<TextField id="ship_no" label="품목 명" variant="outlined" size="small" InputProps={{ readOnly: true, }} sx={{ ml: 1, }} />
								</Grid>



								<Grid sx={{ ml: 1, mt: 1 , display: 'flex'}} xs={8} container direction="row">
									<TextField id="ship_no" label="수주수량" variant="outlined" size="small" sx={{ ml: 1, width: 140 }} />
									<TextField id="ship_no" label="단위" variant="outlined" size="small" InputProps={{ readOnly: true, }} sx={{ ml: 1, width: 100 }} />
									<Grid item xs={8} sx={{ ml: 1 ,mt: -1 ,  display: 'flex'}}>
									<LocalizationProvider dateAdapter={AdapterDayjs} >
										<DemoContainer  components={['DatePicker', 'DatePicker']}
											sx={{
												display: 'flex',
												flexDirection: 'column',
												width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
											}}>
											<DatePicker label="수주일자"
												views={['year', 'month', 'day']}
												format="YYYY-MM-DD"
												value={dteShip}
												sx={{ ml: 1, width: 140 }}
												onChange={(newValue) => setDteShip(newValue)}
												slotProps={{ textField: { size: 'small' } }} />
											<DatePicker
												label="납품일자"
												views={['year', 'month', 'day']}
												format="YYYY-MM-DD"
												value={dteDeli}
												sx={{ ml: 1, width: 140 }}
												onChange={(newValue) => setDteDeli(newValue)}
												slotProps={{ textField: { size: 'small' } }} />
										</DemoContainer>
									</LocalizationProvider>
									</Grid>
								</Grid>

								<Grid sx={{ ml: 1, mt: 1 }} xs={8} container direction="row">
								<TextField id="ship_no" label="특이사항" variant="outlined" size="small" sx={{ ml: 1, width: 920 }} />
								</Grid>

								<Grid sx={{ ml: 1, mt: 1 }} xs={8} container direction="row">
									<Button sx={{ ml: 1, }} variant="outlined">저장</Button>
									<Button sx={{ ml: 1, }} variant="outlined">삭제</Button>

								</Grid>

							</Grid>

						</Grid>
						

					</Paper>
				</Box>
			</Drawer>
		</ThemeProvider >
	);
}