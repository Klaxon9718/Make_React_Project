import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import CustPopup from 'src/pages/ship/components/CustPopup';
import { useNavigate } from "react-router-dom";

//#region MUI 속성
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/base/Button';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Bar from 'src/pages/section/Bar'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//#endregion


//그리드 설정
const columns = [
	{ field: 'SHIP_NO', headerName: '수주번호', width: 120, editable: true },
	{ field: 'SHIP_FLAG', headerName: '수주구분', editable: true },
	{ field: 'ORDER_FLAG', headerName: '주문유형', editable: true },
	{ field: 'CUST_CODE', headerName: '거래처 코드', width: 120, editable: true },
	{ field: 'CUST_NAME', headerName: '거래처 명', width: 150, editable: true },
	{ field: 'CUST_ADD', headerName: '거래처 주소', width: 150, editable: true },
	{ field: 'ITEM_CODE', headerName: '품목 코드', width: 120, editable: true },
	{ field: 'ITEM_NAME', headerName: '품목 명', width: 150, editable: true },
	{ field: 'SHIP_QTY', headerName: '수주수량', width: 120, editable: true },
	{ field: 'UNIT', headerName: '단위', editable: true },
	{ field: 'SHIP_DATE', headerName: '수주일자', width: 120, editable: true },
	{ field: 'DELI_DATE', headerName: '납품일자', width: 120, editable: true },
	{ field: 'INS_EMP', headerName: '등록자', width: 100, editable: true },
	{ field: 'REMARK', headerName: '특이사항', width: 150, editable: true },
];


export default function Ship() {
	const [rows, setRows] = React.useState([]);
	const [value, setValue] = React.useState(dayjs('2022-04-17')); //날짜
	const [age, setAge] = React.useState(''); //cbo박스

	const [isCustPopupOpen, setIsCustPopupOpen] = useState(false);  // 팝업을 띄울지 말지 결정하는 상태 및 그 상태를 바꾸는 함수

	const navigate = useNavigate(); //#region 사용자 세션처리

	const chk_session = () => {
	if (sessionStorage.getItem('session_id') === null ){
		sessionStorage.clear();
		navigate("/login"); // "/login"으로 이동
	}
}
	// 팝업을 열기위한 함수
	const handleOpenCustPopup = () => {
		setIsCustPopupOpen(true);
	};

	// 팝업을 닫기위한 함수
	const handleCloseCustPopup = () => {
		setIsCustPopupOpen(false);
	};


	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handelSelect = async (event) => {
		event?.preventDefault(); // event가 존재하면 preventDefault() 호출

		await new Promise((r) => setTimeout(r, 0));

		const response = axios.post('/test/shipSelect', {
			'dte_shipfrom': '2000-06-06',
			'dte_shipto': '2024-05-02',
			'dte_delidate': '2000-06-06',
			'dte_delito': '2024-05-02',
			'shipflag': '',
			'orderflag': '',
			'cust_code': '',
			'cust_name': '',
			'item_code': '',
			'item_name': '',
		})
			.then(function (response) {
				console.log("그리드 조회 성공 " + response.status);
				console.log("그리드 조회 성공 " + response.data);
				setRows(response.data);
				console.log("json 그리드 연동 : " + rows)
			})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			})
	}

	useEffect(() => {
		chk_session();
		handelSelect();
	}, []);

	return (

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
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>

						<Grid item xs={4} >
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DatePicker', 'DatePicker']}
								>
									{/*수주일자 */}
									<DatePicker
										id="shipFrom"
										label="수주일자 From"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={value}
										onChange={(newValue) => setValue(newValue)}
										slotProps={{ textField: { size: 'small' } }} />
									<DatePicker
										id="shipTo"
										label="수주일자 To"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={value}
										onChange={(newValue) => setValue(newValue)}
										slotProps={{ textField: { size: 'small' } }} />
								</DemoContainer>
							</LocalizationProvider>
							{/* 납품일자 */}
							<LocalizationProvider dateAdapter={AdapterDayjs} >
								<DemoContainer components={['DatePicker', 'DatePicker']}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
										marginTop: 1
									}}>
									<DatePicker label="납품일자 From"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={value}
										onChange={(newValue) => setValue(newValue)}
										slotProps={{ textField: { size: 'small' } }} />
									<DatePicker
										label="납품일자 To"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={value}
										onChange={(newValue) => setValue(newValue)}
										slotProps={{ textField: { size: 'small' } }} />
								</DemoContainer>
							</LocalizationProvider>
						</Grid>


						<Grid item xs={1} sx={{ marginTop: 1 }}>

							<Box sx={{
								maxWidth: 130,
								display: 'flex',
								flexDirection: 'column',
								width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },

							}}>
								{/*수주구분 */}
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label" sx={{ marginTop: -1 }}>수주구분</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={age}
										label="Age"
										onChange={handleChange}
										size={"small"}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>

								{/*주문 유형*/}
								<FormControl fullWidth sx={{ marginTop: 2 }}>
									<InputLabel id="demo-simple-select-label" sx={{ marginTop: -1 }}>주문유형</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={age}
										label="Age"
										onChange={handleChange}
										size={"small"}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>

							</Box>
						</Grid>

						{/*거래처 코드, 거래처 명*/}
						<Grid item xs={4}>
							<Container maxWidth="sm">
								<TextField id="standard-basic" label="거래처 코드" variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} />
								<TextField id="standard-basic" label="거래처 명" variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} />
								<Button onClick={handleOpenCustPopup} ><SearchIcon /></Button>
								{isCustPopupOpen && <CustPopup open={isCustPopupOpen} onClose={handleCloseCustPopup} labelCode={'거래처 코드'} labelName={'거래처 명'}/>}
							</Container>

							{/*품목코드, 품목 명*/}
							<Container maxWidth="sm">
								<TextField id="standard-basic" label="픔목 코드" variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} />
								<TextField id="standard-basic" label="품목 명" variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} />
								<Button><SearchIcon /></Button>
							</Container>
						</Grid>


						<Grid item xs={3} fullWidth>
							<Box sx={{
								Width: 130, height: 60,
								display: 'flex',
							}}></Box>
							<Container sx={{
								height: 40,
								display: 'flex',
							}}>
								<Button size={"medium"} onSubmit={handelSelect} sx={{ mr: 2, }} >조회</Button>
								<Button sx={{ mr: 2 }}>추가</Button>
								<Button sx={{ mr: 2 }}>삭제</Button>
							</Container>
						</Grid>

						{/*onRowCountChange: 행 개수가 변경되면 콜백이 시작됩니다. */}
						<Grid item xs={12} sx={{ maxHeight: 640, maxWidth: '100%' }}>
							전체 행 수 : {rows.length}
							<DataGrid rows={rows} columns={columns} getRowId={(row) => row.SHIP_NO}
								rowHeight={25}
								hideFooter
								checkboxSelection
								disableRowSelectionOnClick
								sx={{ pagination: false }}

							/>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Bar>

	);
}


/* ModalProps={{
	BackdropProps: {
	  invisible: true
	}
  }}
  drawer 사용시 뒤 활성화 */