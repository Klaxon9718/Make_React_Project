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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Bar from 'src/pages/section/Bar'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from "@mui/material/styles";
//#endregion

export default function Ship() {

	//그리드 설정
	const columns = [
		{ field: 'SHIP_NO', headerName: '수주번호', width: 120, editable: false },
		{ field: 'SHIP_FLAG', headerName: '수주구분', width: 80, editable: false, valueGetter: (params) => findNameByCode(params, cboShip) },
		{ field: 'ORDER_FLAG', headerName: '주문유형', editable: false, valueGetter: (params) => findNameByCode(params, cboOrder) },
		{ field: 'CUST_CODE', headerName: '거래처 코드', width: 120, editable: false },
		{ field: 'CUST_NAME', headerName: '거래처 명', width: 150, editable: false },
		{ field: 'CUST_ADDR', headerName: '거래처 주소', width: 150, editable: false },
		{ field: 'ITEM_CODE', headerName: '품목 코드', width: 120, editable: false },
		{ field: 'ITEM_NAME', headerName: '품목 명', width: 150, editable: false },
		{ field: 'QTY', type: 'number', headerName: '수주수량', width: 120, editable: false },
		{ field: 'UNIT', headerName: '단위', width: 60, editable: false },
		{ field: 'SHIP_DATE', headerName: '수주일자', width: 120, editable: false },
		{ field: 'DELI_DATE', headerName: '납품일자', width: 120, editable: false },
		{ field: 'INS_EMP', headerName: '등록자', width: 80, editable: false },
		{ field: 'RE_CONTENT', headerName: '특이사항', width: 150, editable: false },
	];

	//그리드 CODE에 따른 NAME값 출력
	const findNameByCode = (code, array) => {
		const item = array.find((item) => item.CODE === code);
		return item ? item.NAME : 'Not Found';
	};

	const defaultTheme = createTheme(); // 테마 적용

	const [rows, setRows] = React.useState([]);
	const [shipNoList, setShipNoList] = React.useState([]);
	const [shipFrom, setShipFrom] = React.useState(dayjs().subtract(1, 'month')); //날짜
	const [shipTo, setShipTo] = React.useState(dayjs()); //날짜
	const [deliFrom, setDeliFrom] = React.useState(dayjs().subtract(1, 'month')); //날짜
	const [deliTo, setDeliTo] = React.useState(dayjs()); //날짜

	const [isCustPopupOpen, setIsCustPopupOpen] = useState(false);  // 팝업을 띄울지 말지 결정하는 상태 및 그 상태를 바꾸는 함수
	const [selectedCustomer, setSelectedCustomer] = React.useState({ CODE: '', NAME: '' }); //팝업으로부터 값을 가져옴 + 사용자 입력 값 저장
	const [isItemPopupOpen, setIsItemPopupOpen] = useState(false);  // 팝업을 띄울지 말지 결정하는 상태 및 그 상태를 바꾸는 함수
	const [selectedItem, setSelectedItem] = React.useState({ CODE: '', NAME: '' }); //팝업으로부터 값을 가져옴 + 사용자 입력 값 저장
	const [selectedCboShip, setSelectedCboShip] = React.useState({ CODE: '', NAME: '' }); //cbo 선택시 값 저장
	const [selectedCboOrder, setSelectedCboOrder] = React.useState({ CODE: '', NAME: '' }); //cbo 선택시 값 저장

	const [cboShip, setCboShip] = React.useState([]);	//cbo리스트를 받아와 배열로 저장
	const [cboOrder, setCboOrder] = React.useState([]); //cbo리스트를 받아와 배열로 저장

	const [selectedRowData, setSelectedRowData] = useState(null); //그리드 행 선택, 단일 행 선택
	const [addRowData, setAddRowData] = useState(null); //그리드 행 선택, 단일 행 선택
	const [isCheckedRows, setIsCheckedRows] = useState([]); //체크박스 그리드 선택, 다중 행 선택

	const [isDrawerOpen, setIsDrawerOpen] = useState(false); //하단 Drawer 생성
	const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false); // 추가 하단 Drawer 생성
	const [isDialogOpen, setIsDialogOpen] = useState(false); //알림창 생성

	const navigate = useNavigate(); //#region 사용자 세션처리

	const chk_session = () => {
		if (sessionStorage.getItem('session_id') === null) {
			sessionStorage.clear();
			navigate("/login"); // "/login"으로 이동
		}
	}

	// 팝업을 열기 위한 범용 함수
	const handleOpenPopup = (setPopupState) => {
		setPopupState(true);
	};

	// 팝업을 닫기 위한 범용 함수
	const handleClosePopup = (setPopupState) => {
		setPopupState(false);
		handleSelect();
	};


	// CustPopup 값 적용
	const handleSelectCustomer = (customer) => {
		setSelectedCustomer(customer); // 선택된 거래처 정보 저장
		handleSelect();
	};

	// ItemPopup 값 적용
	const handleSelectItem = (Item) => {
		setSelectedItem(Item); // 선택된 품목 정보 저장
		handleSelect();
	};

	//행 클릭 시
	const handleRowClick = (params) => {
		console.log("선택 행 : " + JSON.stringify(params.row)); // 클릭한 행의 데이터
		// 행 데이터를 Drawer 컴포넌트에 전달
		setSelectedRowData(params.row);
		setIsDrawerOpen(true);
	};

	// 체크된 행 업데이트 함수
	const handleCheckRows = (newRowSelectionModel) => {
		setIsCheckedRows(newRowSelectionModel);
		console.log('Selected Row Count: 뉴 로우 행수', newRowSelectionModel.length);
		console.log('Selected Rows: 데이터 출력 is', newRowSelectionModel);

		// 선택된 행의 'desk' 속성값 출력하기
		newRowSelectionModel.forEach((row) => {
			console.log('Desk Value:', row.SHIP_NO);
		});

		// 선택된 행의 데이터 가져오기
		// const selectedRows = rows.filter((row) => newRowSelectionModel.includes(row.id)); => 안됨

		// console.log('Selected Row Count:isCheckedRows 행수', isCheckedRows.length); => 실행이 한박자 느림
		// console.log('Selected Rows: 데이터 출력 is', isCheckedRows);
	};

	//PlanOrder있는 지 확인
	const chkPlanList = async() =>{
		try {
		const response = await axios.post('/test/chkPlanList');
		//console.log("chkPlanList 데이터 : ", response.data.map(item => item.SHIP_NO));
		setShipNoList(response.data.map(item => item.SHIP_NO));
	} catch (error) {
		console.error('Error occurred during chkPlanList processing:', error.message);
		return;
	  }
	} 

	// "삭제" 버튼을 눌렀을 때 실행되는 함수
	const handleDeleteButtonClick = () => {
		if(isCheckedRows.length === 0) return;
		console.log("삭제 항목 수 확인 : ", isCheckedRows.length)
		console.log("삭제 항목 수 확인 : ", isCheckedRows)
		setIsDialogOpen(true)
		handleSelect();

	};


	//텍스트필드 값 변경
	const handleChange = (setter, key, event) => { //setter는 컴포넌트를 가짐
		setter(prevState => ({
			...prevState, //이전 상태 저장
			[key]: event.target.value //해당 키에 대한 값을 변경
		}));
	};

	const handleSelect = async (event) => {
		event?.preventDefault(); // event가 존재하면 preventDefault() 호출

		await axios.post('/test/shipSelect', {
			'dte_shipfrom': shipFrom.add(1, "day"),
			'dte_shipto': shipTo.add(1, "day"),
			'dte_delidate': deliFrom.add(1, "day"),
			'dte_delito': deliTo.add(1, "day"),
			'shipflag': selectedCboShip.CODE,
			'orderflag': selectedCboOrder.CODE,
			'cust_code': selectedCustomer.CODE,
			'cust_name': selectedCustomer.NAME,
			'item_code': selectedItem.CODE,
			'item_name': selectedItem.NAME,
		})
			.then(function (response) {
				console.log("그리드 조회 성공 " + response.data);
				setRows(response.data);
			})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			})
	}

	// 수주 콤보박스 리스트 가져옴
	const fetchShipOptions = async () => {
		try {
			const response = await axios.post('/test/cboShipList');
			setCboShip(response.data); // 콤보박스 상태 업데이트
		} catch (error) {
			console.error('Error fetching ship options:', error);
		}
	};

	//주문유형 콤보박스 리스트 가져옴
	const fetchOrderOptions = async () => {
		try {
			const response = await axios.post('/test/cboOrderList');
			setCboOrder(response.data); // 콤보박스 상태 업데이트
		} catch (error) {
			console.error('Error fetching order options:', error);
		}
	};

	useEffect(() => {
		chk_session();
		handleSelect();
		fetchShipOptions();
		fetchOrderOptions();
		chkPlanList();
	}, [selectedCustomer, selectedItem, selectedCboOrder, selectedCboShip, shipFrom, shipTo, deliFrom, deliTo]); //추후 rows 추가할 것

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
					<Box sx={{ flexGrow: 1, }}>
						<Grid container spacing={2}>
							<Grid item xs={4} >
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DatePicker', 'DatePicker']}>
										{/*수주일자 */}
										<DatePicker
											id="shipFrom"
											label="수주일자 From"
											views={['year', 'month', 'day']}
											format="YYYY-MM-DD"
											value={shipFrom}
											onChange={(newValue) => setShipFrom(newValue)}
											slotProps={{ textField: { size: 'small' } }} />
										<DatePicker
											id="shipTo"
											label="수주일자 To"
											views={['year', 'month', 'day']}
											format="YYYY-MM-DD"
											value={shipTo}
											onChange={(newValue) => {console.log("새로운 값 : newValue", newValue); setShipTo(newValue); console.log("적용 값 : newValue", shipTo); }}
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
											value={deliFrom}
											onChange={(newValue) => setDeliFrom(newValue)}
											slotProps={{ textField: { size: 'small' } }} />
										<DatePicker
											label="납품일자 To"
											views={['year', 'month', 'day']}
											format="YYYY-MM-DD"
											value={deliTo}
											onChange={(newValue) => setDeliTo(newValue)}
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
											value={selectedCboShip.CODE || ''}
											label="수주구분"
											onChange={(event) => handleChange(setSelectedCboShip, 'CODE', event)}
											size={"small"}
										>
											{cboShip.map((option) => (
												<MenuItem key={option.CODE} value={option.CODE}>
													{option.NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>

									{/*주문 유형*/}
									<FormControl fullWidth sx={{ marginTop: 2 }}>
										<InputLabel id="demo-simple-select-label" sx={{ marginTop: -1 }}>주문유형</InputLabel>
										<Select
											value={selectedCboOrder.CODE || ''}
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											label='주문 유형'
											onChange={(event) => handleChange(setSelectedCboOrder, 'CODE', event)}
											size={"small"}
										>
											{cboOrder.map((option) => (
												<MenuItem key={option.CODE} value={option.CODE}>
													{option.NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>

								</Box>
							</Grid>

							{/*거래처 코드, 거래처 명*/}
							<Grid item xs={5}>
								<Container maxWidth="sm">
									<TextField id="standard-basic" label="거래처 코드" variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} value={selectedCustomer.CODE} onChange={(event) => handleChange(setSelectedCustomer, 'CODE', event)} />
									<TextField id="standard-basic" label="거래처 명" variant="standard" size={"small"} sx={{ p: 1, mt: -1, editable: true }} value={selectedCustomer.NAME} onChange={(event) => handleChange(setSelectedCustomer, 'NAME', event)} />
									<Button onClick={() => handleOpenPopup(setIsCustPopupOpen)} ><SearchIcon /></Button>
									{isCustPopupOpen && <Popup isopen={isCustPopupOpen} onClose={() => handleClosePopup(setIsCustPopupOpen)} labelCode={'거래처 코드'} labelName={'거래처 명'} tname={'Customer_Master'} calcode={'customer_code'} calname={'customer_name'} onSelect={handleSelectCustomer} />}
								</Container>

								{/*품목코드, 품목 명*/}
								<Container maxWidth="sm">
									<TextField id="standard-basic" label="픔목 코드" variant="standard" size={"small"} sx={{ p: 1, editable: true }} value={selectedItem.CODE} onChange={(event) => handleChange(setSelectedItem, 'CODE', event)} />
									<TextField id="standard-basic" label="품목 명" variant="standard" size={"small"} sx={{ p: 1, editable: true }} value={selectedItem.NAME} onChange={(event) => handleChange(setSelectedItem, 'NAME', event)} />
									<Button onClick={() => handleOpenPopup(setIsItemPopupOpen)} sx={{ p: 2, }}><SearchIcon /></Button>
									{isItemPopupOpen && <Popup isopen={isItemPopupOpen} onClose={() => handleClosePopup(setIsItemPopupOpen)} labelCode={'품목 코드'} labelName={'품목 명'} tname={'Item_Master'} calcode={'Item_code'} calname={'Item_name'} onSelect={handleSelectItem} />}
								</Container>
							</Grid>


							<Grid item xs={1} fullWidth>
								<Container sx={{
									display: 'flex',
									paddingTop: 8,
									marginLeft: -10
								}}>
									<Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleOpenPopup(setIsAddDrawerOpen)}>추가</Button>
									{isAddDrawerOpen && <Drawer isopen={isAddDrawerOpen} onClose={() => handleClosePopup(setIsAddDrawerOpen)} route={'Button'} selectedData={addRowData}/>}
									<Button variant="outlined" sx={{ mr: 2 }} onClick={handleDeleteButtonClick}>삭제</Button>
									{isDialogOpen && <Dialog isopen={isDialogOpen} onClose={() => handleClosePopup(setIsDialogOpen)} deleteList={isCheckedRows}/>}
								</Container>
							</Grid>

							{/*onRowCountChange: 행 개수가 변경되면 콜백이 시작됩니다. */}
							<Grid item xs={12} sx={{ minHeight:640,  maxHeight: 640, maxWidth: '100%', mt: -3 }}>
								전체 행 수 : {rows.length}
								<DataGrid 
									rows={rows} columns={columns} getRowId={(row) => row.SHIP_NO}
									rowHeight={25}
									hideFooter
									checkboxSelection
									disableRowSelectionOnClick
									columnHeaderHeight={25}
									sx={{ pagination: false }}
									slots={{
										toolbar: GridToolbar,
									}}
									slotProps={{
										row: selectedRowData
									}}
									onRowClick={(params) => handleRowClick(params)} //행 클릭 시
									onRowSelectionModelChange={handleCheckRows}//삭제 처리
									isRowSelectable={(params) => !shipNoList.includes(params.row.SHIP_NO)}
									isCheckedRows={isCheckedRows}
								/>
								{isDrawerOpen && <Drawer route={'Grid'} selectedData={selectedRowData} isopen={isDrawerOpen} onClose={() => handleClosePopup(setIsDrawerOpen)} />}
							</Grid>
						</Grid>
					</Box>
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