import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
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


const columns = [
	{ field: 'SHIP_NO', headerName: '수주번호', width: 150, editable: true },
	{ field: 'SHIP_FLAG', headerName: '수주구분', width: 150, editable: true },
	{ field: 'ORDER_FLAG', headerName: '주문유형', width: 150, editable: true },
	{ field: 'CUST_CODE', headerName: '거래처 코드', width: 150, editable: true },
	{ field: 'CUST_NAME', headerName: '거래처 명', width: 150, editable: true },
	{ field: 'CUST_ADD', headerName: '거래처 주소', width: 150, editable: true },
	{ field: 'ITEM_CODE', headerName: '품목 코드', width: 150, editable: true },
	{ field: 'ITEM_NAME', headerName: '품목 명', width: 150, editable: true },
	{ field: 'SHIP_QTY', headerName: '수주수량', width: 150, editable: true },
	{ field: 'UNIT', headerName: '단위', width: 150, editable: true },
	{ field: 'SHIP_DATE', headerName: '수주일자', width: 150, editable: true },
	{ field: 'DELI_DATE', headerName: '납품일자', width: 150, editable: true },
	{ field: 'INS_EMP', headerName: '등록자', width: 150, editable: true },
	{ field: 'REMARK', headerName: '즉이사항', width: 150, editable: true },
];

const rows = [
];



export default function Ship() {
	const [grid, setGrid] = React.useState([]);
	const [value, setValue] = React.useState(dayjs('2022-04-17')); //날짜
	const [age, setAge] = React.useState(''); //cbo박스


	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handelSelect = async (event) =>{
		event?.preventDefault(); // event가 존재하면 preventDefault() 호출

		await new Promise((r) => setTimeout(r,0));

		const response = axios.post('/test/shipSelect',{
			'dte_shipfrom': '2000-06-06',
			'dte_shipto': '2024-05-02',
			'dte_delidate':'2000-06-06',
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
			setGrid(response.data);
		})
		.catch(function (error){
			console.error('Error occurred during login processing:', error.message);
		})
	}

	useEffect(() => {
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
										format="YYYY-MM/-DD"
										value={value}
										onChange={(newValue) => setValue(newValue)}
										slotProps={{ textField: { size: 'small' } }} />
								</DemoContainer>
							</LocalizationProvider>

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


						<Grid item xs={4}>
							<Container maxWidth="sm">
								<TextField id="standard-basic" label="거래처 코드" variant="standard" size={"small"}
									 sx={{ p: 1, mt: -1 }} />
								<TextField id="standard-basic" label="거래처 명" variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} />
								<Button><SearchIcon /></Button>
							</Container>

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
						<Grid item xs={12} sx={{ maxHeight: 670, maxWidth: '100%' }}>
							<DataGrid rows={rows} columns={columns} getRowId={(row) => row.SHIP_NO}
								hideFooterPagination
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
