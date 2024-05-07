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

import Popup from 'src/pages/ship/components/Popup';


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

	const [cust, setCust] = React.useState({ CODE: '', NAME: '' });
	const [item, setItem] = React.useState({ CODE: '', NAME: '' });

	const [dteShip, setDteShip] = React.useState(dayjs()); //날짜
	const [dteDeli, setDteDeli] = React.useState(dayjs()); //날짜

	const[isCustPopupOpen, setIsCustPopupOpen] = React.useState(false);
	const[isItemPopupOpen, setIsItemPopupOpen] = React.useState(false);

	const defaultTheme = createTheme(); // 테마 적용

	//텍스트필드 값 변경
	const handleChange = (setter, key, event) => { //setter는 컴포넌트를 가짐
		setter(prevState => ({
			...prevState, //이전 상태 저장
			[key]: event.target.value //해당 키에 대한 값을 변경
		}));
	};

	// CustPopup 값 적용
	const handleSelectCustomer = (customer) => {
		setCust(customer);
	};

	// ItemPopup 값 적용
	const handleSelectItem = (Item) => {
		setItem(Item);

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

	
	// 팝업을 열기 위한 범용 함수
	const handleOpenPopup = (setPopupState) => {
		setPopupState(true);
	};

	// 팝업을 닫기 위한 범용 함수
	const handleClosePopup = (setPopupState) => {
		setPopupState(false);
	};

	useEffect(() => {
		fetchShipOptions();
		fetchOrderOptions();
	}, []);


	return (
		<ThemeProvider theme={defaultTheme}>
			<Drawer anchor={'bottom'} open={props.isopen} onClose={props.onClose}>

				<Paper sx={{ display: 'flex', width: '100%', }} square={false} elevation={3}>
					<Box>
						<Box sx={{ width: '100%', mt: 2, ml: 1, display: 'flex', alignItems: 'center' }} >

							<TextField
								sx={{ width: 200, ml: 1 }}
								id="ship_no"
								label="수주번호"
								variant="outlined"
								size="small"
								InputLabelProps={{ shrink: true }}
								InputProps={{ readOnly: true, }}
							/>

							<FormControl sx={{ ml: 1 }} >
								<InputLabel id="demo-simple-select-label" sx={{ mt: -1 }}>수주구분</InputLabel>
								<Select
									value={selectedCboShip.CODE || ''}
									label="수주구분"
									onChange={(event) => handleChange(setSelectedCboShip, 'CODE', event)}
									size="small"
									sx={{ width: 120 }}
								>
									{cboShip.map((option) => (
										<MenuItem key={option.CODE} value={option.CODE}>
											{option.NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl sx={{ ml: 1 }} >
								<InputLabel id="demo-simple-select-label" sx={{ mt: -1 }}>주문유형</InputLabel>
								<Select
									value={selectedCboOrder.CODE || ''}
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									onChange={(event) => handleChange(setSelectedCboOrder, 'CODE', event)}
									size="small"
									sx={{ height: 40, width: 120 }}
								>
									{cboOrder.map((option) => (
										<MenuItem key={option.CODE} value={option.CODE}>
											{option.NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>


						<Box sx={{ display: 'flex', width: '100%', mt: 2, ml: 1 }}>
							<TextField onClick={() => handleOpenPopup(setIsCustPopupOpen)} value ={cust.CODE} id="ship_no" label="거래처코드" variant="outlined" size="small" InputProps={{ readOnly: true, }}  InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40, width: 160 }} />
							<TextField onClick={() => handleOpenPopup(setIsCustPopupOpen)} value ={cust.NAME} id="ship_no" label="거래처명" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40 }} />
							{isCustPopupOpen && <Popup isopen={isCustPopupOpen} onClose={() => handleClosePopup(setIsCustPopupOpen)} labelCode={'거래처 코드'} labelName={'거래처 명'} tname={'Customer_Master'} calcode={'customer_code'} calname={'customer_name'} onSelect={handleSelectCustomer} />}
							
							<TextField  onClick={() => handleOpenPopup(setIsItemPopupOpen)} value ={item.CODE} id="ship_no" label="품목 코드" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40, width: 160 }} />
							<TextField  onClick={() => handleOpenPopup(setIsItemPopupOpen)} value ={item.NAME} id="ship_no" label="품목 명" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }}  sx={{ ml: 1, height: 40 }} />
							{isItemPopupOpen && <Popup isopen={isItemPopupOpen} onClose={() => handleClosePopup(setIsItemPopupOpen)} labelCode={'품목 코드'} labelName={'품목 명'} tname={'Item_Master'} calcode={'Item_code'} calname={'Item_name'} onSelect={handleSelectItem} />}
						</Box>

						<Box sx={{ display: 'flex', width: '100%', mt: 2, ml: 1 }}>
							<TextField id="ship_no" label="수주수량" variant="outlined" size="small" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, }} sx={{ ml: 1, height: 40, width: 140 }} />
							<TextField id="ship_no" label="단위" variant="outlined" size="small" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, }} sx={{ ml: 1, height: 40, width: 100 }} />
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Box sx={{
									display: 'flex',
									ml: 1,
									width: 'auto',
								}}
								>
									<DatePicker
										label="수주일자"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={dteShip}
										sx={{ ml: 1, height: 40, width: 160 }}
										onChange={(newValue) => setDteShip(newValue)}
										slotProps={{ textField: { size: 'small' } }} />

									<DatePicker
										label="납품일자"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={dteDeli}
										sx={{ ml: 1, height: 40, width: 160 }}
										onChange={(newValue) => setDteShip(newValue)}
										slotProps={{ textField: { size: 'small' } }} />
								</Box>
							</LocalizationProvider>
						</Box>


						<Box sx={{ display: 'flex', width: '100%', mt: 1, ml: 1 }}>
							<Button sx={{ ml: 1, }} variant="outlined">저장</Button>
							<Button sx={{ ml: 1, }} variant="outlined">삭제</Button>
						</Box>
					</Box>

					<Box>
						<TextField id="ship_no" label="특이사항" variant="outlined" size="small" 
						multiline
						rows={8}
						sx={{ mt: 2, mb:1,  ml: 10, width: 800, }} 
						InputProps={{style: {height: 'flex',},}} />
					</Box>
				</Paper>

			</Drawer>
		</ThemeProvider >
	);
}