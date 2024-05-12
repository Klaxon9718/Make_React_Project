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
import Alert from '@mui/material/Alert';

import Dialog from 'src/pages/planOrder/components/Dialog';
import OnePopup from 'src/pages/planOrder/components/OnePopup';

export default function BottomDrawer(props) {

	const { selectedData } = props;

	const [cboShip, setCboShip] = React.useState([]);	//cbo리스트를 받아와 배열로 저장
	const [cboOrder, setCboOrder] = React.useState([]); //cbo리스트를 받아와 배열로 저장
	const [selectedCboShip, setSelectedCboShip] = React.useState({ CODE: '', NAME: '' }); //cbo 선택시 값 저장
	const [selectedCboOrder, setSelectedCboOrder] = React.useState({ CODE: '', NAME: '' }); //cbo 선택시 값 저장

	const [shipNo, setShipNo] = React.useState('');
	const [planOrderNo, setPlanOrderNo] = React.useState('');
	const [cust, setCust] = React.useState({ CODE: '', NAME: '' });	//거래처
	const [item, setItem] = React.useState({ CODE: '', NAME: '' }); //품목
	const [unit, setUnit] = React.useState('');	// 단위
	const [remark, setRemark] = React.useState(''); // 특이사항
	const [qty, setQty] = React.useState('');
	const [dtePlan, setDtePlan] = React.useState(dayjs()); //날짜
	const [dteDeli, setDteDeli] = React.useState(dayjs()); //날짜
	const [beforeQty, setBeforeQty] = React.useState(dayjs()); // 최초수주 등록시 수량을 확인하기 위한 변수

	const [isOnePopupOpen, setIsOnePopupOpen] = React.useState(false);

	const [isAlert, setIsAlert] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false); //알림창 생성
	const [clickSave, setClickSave] = React.useState(false);

	const [chkWorkOrder, setChkWorkOrder] = React.useState(false);

	const defaultTheme = createTheme(); // 테마 적용

	//텍스트필드 값 변경
	const handleChange = (setter, key, event) => { //setter는 컴포넌트를 가짐
		setter(prevState => ({
			...prevState, //이전 상태 저장
			[key]: event.target.value //해당 키에 대한 값을 변경
		}));
	};

	//선택한 값 설정
	const handleSelectData = (data) => {
		console.log("팝업 받은 값 출력 ",data);
		console.log("팝업 받은 값 출력 수량 ",data.QTY);
		console.log("팝업 받은 값 출력 수량 ",data.SHIP_NO);
		setBeforeQty(data.QTY)
		setQty(data.QTY);
		setUnit(data.UNIT);
		setShipNo(data.SHIP_NO);
		setCust({ CODE: data.CUST_CODE, NAME: data.CUST_NAME });
		setItem({ CODE: data.ITEM_CODE, NAME: data.ITEM_NAME });
		setSelectedCboShip(data.SHIP_FLAG);
		setDtePlan(data.SHIP_DATE);
		setDteDeli(data.DELI_DATE);
	}

	//#region 요청
	// 수주 콤보박스 리스트 가져옴
	const fetchShipOptions = async () => {
		try {
			const response = await axios.post('/test/addCboShipList');
			setCboShip(response.data); // 콤보박스 상태 업데이트
		} catch (error) {
			console.error('Error fetching ship options:', error);
		}
	};

	//단위 설정
	const fetchUnit = async () => {
		try {
			console.log("CODE 값 async: " + item.CODE);
			await axios.post('/test/getUnit', {
				'code': item.CODE,
			})
				.then(function (response) {
					console.log("UNIT 조회");
					console.log(response.data);
					console.log("CODE 값 : " + item.CODE);
					setUnit(response.data);
				})
				.catch(function (error) {
					console.error('Error occurred during UNIT processing:', error.message);
				})
		} catch (error) {
			console.error('Error fetching UNIT options:', error);
		}
	};
	//#endregion

	//저장
	const handleSave = async () => {
		// console.log("OREDER_FLAG':selectedCboShip.CODE, 값 async: " + selectedCboShip.CODE);
		console.log("Drawer REMARK 출력 " + remark);
		console.log("Drawer REMARK 출력 " + shipNo);
		console.log("세션 " + sessionStorage.getItem('session_id'));

		//모든 값이 들어가야 함
		if ((!selectedData) && (!shipNo || !qty)) {
			console.log("저장 조건문에서 찍는 selectedData : ", selectedData);
			setIsError(true)
			return; // 함수 실행을 여기서 중단
		}

		// 수주 설정 수량 보다 클 수 없음
		if ((!selectedData) && (beforeQty < qty)) {
			console.log("수량 조건문에서 찍는 selectedData : ", selectedData);
			console.log("수량 조건문에서 찍는 beforeQty : ", beforeQty);
			console.log("수량 조건문에서 찍는 qty : ", qty);
			setIsError(true)
			return; // 함수 실행을 여기서 중단
		}

		if (selectedData) { console.log("출력 1차 selectedData.SHIP_NO: ", selectedData.SHIP_NO); setShipNo(selectedData.SHIP_NO); console.log("출력 2차 shipNo : ", shipNo) }

		try {
			await axios.post('/test/planOrderSave', {
				'PLANORDER_NO': planOrderNo ,
				'SHIP_NO': shipNo,
				'CUST_CODE': cust.CODE,
				'ITEM_CODE': item.CODE,
				'PLAN_QTY': qty,
				'PLANINS_EMP_CODE':sessionStorage.getItem('session_id'),
				'PLAN_DATE': dtePlan,
				'DELI_DATE': dteDeli,
				'RE_CONTENT': remark,
				'INS_EMP': sessionStorage.getItem('session_id'),
				'UP_EMP': sessionStorage.getItem('session_id'),
			})
				.then(function (response) {
					console.log("저장 성공");
					setIsError(false);
					setIsAlert(true);

				})
		} catch (error) {
			console.error('Error occurred during save processing:', error.message);
			// setIsError(true)
		}
	};

	//삭제
	function deleteData () {
		setIsDialogOpen(true)
}

//OnePopup 열기
const handleClosePopup = () => {
	setIsOnePopupOpen(false);
};

const handleOpenPopup = () => {
	setIsOnePopupOpen(true);
};

	//생산정보등록이 있는지 판별 후 상태 변경
	const DrawerChkWorkOrder = async () => {
		try {
			console.log("DrawerChkWorkOrder 실행");
			await axios.post('/test/DrawerChkWorkOrder', {
				'planOrder_no': selectedData.PLANORDER_NO,
			})
				.then(function (response) {
					console.log("작업지시 응답확인 : ", response.data);
					if (response.data) {
						console.log("작업지시 존재", response.data);
						setChkWorkOrder(true);
						console.log("데이터 확인", chkWorkOrder);
					} else {
						console.log("조건 밖");
						setChkWorkOrder(false);
					}
				})
		} catch (error) {
			console.error('Error occurred during ChkPlanOrder processing:', error.message);
		}

	};

	useEffect(() => {


		if (selectedData) {
			// console.log("전달받은 행 값:");
			console.log("이전 데이터 SHIP_NO ", selectedData);
			DrawerChkWorkOrder();
			// 수주 번호와 변경값 설정
			setShipNo(selectedData.SHIP_NO);
			setQty(selectedData.PLAN_QTY);
			setRemark(selectedData.RE_CONTENT);
			setPlanOrderNo(selectedData.PLANORDER_NO);
		}

		// 저장 버튼 클릭 시
		if (clickSave) {
			console.log("저장 진입");
			console.log("DTEPLAN 출력 ", dtePlan)
		setDtePlan(dtePlan);
		setDteDeli(dteDeli);
setQty(qty)
			handleSave();
			setClickSave(false);
		}

		fetchShipOptions();

		//fetchOrderOptions();
		console.log("리마크 날짜", dtePlan);
		// console.log("리마크 ", qty);
		// setRemark(remark);



		if (item.CODE !== '') {	//아이템 코드가 있을 경우만 실행
			fetchUnit();
		}

	}, [cust, item, selectedData, selectedCboShip, selectedCboOrder, chkWorkOrder, qty, remark, clickSave, shipNo, dtePlan, dteDeli]);


	return (
		<ThemeProvider theme={defaultTheme}>
			<Drawer anchor={'bottom'} open={props.isopen} onClose={props.onClose}>

				<Paper sx={{ display: 'flex', width: '100%', }} square={false} elevation={3}>
					<Box>
						<Box sx={{ width: '100%', mt: 2, ml: 1, display: 'flex', alignItems: 'center' }} >

							<TextField
								sx={{ width: 200, ml: 1 }}
								label="생산계획번호"
								variant="outlined"
								size="small"
								value={selectedData ? selectedData.PLANORDER_NO : ''}
								InputLabelProps={{ shrink: true }}
								InputProps={{ readOnly: true, }}
							/>

<TextField
								sx={{ width: 200, ml: 1 }}
								label="수주번호"
								variant="outlined"
								size="small"
								value={selectedData ? selectedData.SHIP_NO : shipNo || ''}
								onClick={() => { if (!selectedData) { handleOpenPopup(setIsOnePopupOpen) } }} 
								InputLabelProps={{ shrink: true }}
								InputProps={{ readOnly: true, }}
							/>

							<FormControl sx={{ ml: 1 }} >
								<InputLabel id="demo-simple-select-label" sx={{ mt: -1 }}>수주구분</InputLabel>
								<Select
									value={selectedData ? selectedData.SHIP_FLAG : selectedCboShip  || ''}
									onClick={() => { if (!selectedData) { handleOpenPopup(setIsOnePopupOpen) } }} 
									onChange={(event) => handleChange(setSelectedCboShip, 'CODE', event)}
									readOnly={true}
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
						</Box>

						<Box sx={{ display: 'flex', width: '100%', mt: 2, ml: 1 }}>
							<TextField onClick={() => { if (!selectedData) { handleOpenPopup(setIsOnePopupOpen) } }} value={selectedData ? selectedData.CUST_CODE : cust.CODE || ''} onChange={(e) => setCust({ 'CODE': e.target.value })} id="ship_no" label="거래처코드" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40, width: 160 }} />
							<TextField onClick={() => { if (!selectedData) { handleOpenPopup(setIsOnePopupOpen) } }}  value={selectedData ? selectedData.CUST_NAME : cust.NAME || ''} id="ship_no" label="거래처명" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40 }} />
							{isOnePopupOpen && <OnePopup isopen={isOnePopupOpen} onClose={() => handleClosePopup(setIsOnePopupOpen)} onSelect={handleSelectData}></OnePopup> }

							<TextField onClick={() => { if (!selectedData) { handleOpenPopup(setIsOnePopupOpen) } }}  value={selectedData ? selectedData.ITEM_CODE : item.CODE || ''} id="ship_no" label="품목 코드" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40, width: 160 }} />
							<TextField onClick={() => { if (!selectedData) { handleOpenPopup(setIsOnePopupOpen) } }}  value={selectedData ? selectedData.ITEM_NAME : item.NAME || ''} id="ship_no" label="품목 명" variant="outlined" size="small" InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} sx={{ ml: 1, height: 40 }} />
						</Box>

						<Box sx={{ display: 'flex', width: '100%', mt: 2, ml: 1 }}>

							<TextField
								id="ship_no"
								label="계획수량"
								variant="outlined"
								size="small"
								value={selectedData ? selectedData.PLAN_QTY : qty || ''}
								disabled={Boolean(selectedData)}
								onChange={(e) => {
									if (selectedData) {  //이전 값이 있는 경우, 
										if (!chkWorkOrder) {
											console.log("수량 : ", e.target.value)
											selectedData.PLAN_QTY = e.target.value; // selectedData 업데이트
											setQty(e.target.value); // 상태 업데이트
											console.log("입력 값 QTY : ", qty);
										} else {
											// const updatedSelectedData = { ...selectedData,selectedData };
											setQty(selectedData.PLAN_QTY);
										}
									} else {
										// selectedData가 없는 경우, state에만 저장
										setQty(e.target.value);
									}
								}}
								InputLabelProps={{ shrink: true }}
								sx={{ ml: 1, height: 40, width: 140 }}
								inputProps={{ type: 'number' }}
								// disabled={chkWorkOrder} // chkPlanOrder가 true일 때 비활성화
							/>

							<TextField id="ship_no" value={selectedData ? selectedData.UNIT : unit} label="단위" variant="outlined" size="small" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, }} sx={{ ml: 1, height: 40, width: 100 }} />
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Box sx={{
									display: 'flex',
									ml: 1,
									width: 'auto',
								}}
								>
									<DatePicker
										label="계획일자"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={selectedData ? dayjs(selectedData.PLAN_DATE) : dayjs(dtePlan)}
										readOnly={Boolean(selectedData)}
										onChange={(newValue) => setDtePlan(dayjs(newValue).format('YYYY-MM-DD'))}
										sx={{ ml: 1, height: 40, width: 160 }}
										slotProps={{ textField: { size: 'small' } }} />

									<DatePicker
										label="납기예정일"
										views={['year', 'month', 'day']}
										format="YYYY-MM-DD"
										value={selectedData ? dayjs(selectedData.DELI_DATE) : dayjs(dteDeli)}
										readOnly={Boolean(selectedData)}
										sx={{ ml: 1, height: 40, width: 160 }}
										onChange={(newValue) => setDteDeli(dayjs(newValue).format('YYYY-MM-DD'))}
										slotProps={{ textField: { size: 'small' } }} />
								</Box>
							</LocalizationProvider>
						</Box>


						<Box sx={{ display: 'flex', width: '100%', mt: 1, ml: 1 }}>
							<Button sx={{ ml: 1, }} variant="outlined" onClick={() => setClickSave(true)}>저장</Button>
							{selectedData && !chkWorkOrder && ( // 생산계획정보가 존재하는 경우, 새로 추가하는 경우 삭제 버튼 안생김
								<Button sx={{ ml: 1 }} variant="outlined" onClick={deleteData}>삭제</Button>
							)}
							{isDialogOpen && <Dialog isopen={isDialogOpen} onClose={() => setIsDialogOpen(false)} deleteList={[selectedData.PLANORDER_NO]}/>}
						</Box>
					</Box>

					<Box>
						<TextField id="ship_no" label="특이사항" variant="outlined" size="small"
							multiline
							rows={8}
							value={selectedData ? selectedData.RE_CONTENT : remark || ''}
							onChange={(e) => {
								if (selectedData) { // selectedData가 있고, chkPlanOrder가 false인 경우에만 변경 허용
									console.log("입력 값 ", e.target.value);
									selectedData.RE_CONTENT = e.target.value; // selectedData 업데이트
									setRemark(e.target.value); // 상태 업데이트
									console.log("입력 값 remark", remark);
								} else {
									// selectedData가 없는 경우, state에만 저장
									setRemark(e.target.value);
								}
							}}
							sx={{ mt: 2, mb: 1, ml: 10, width: 800, }}
							InputProps={{ style: { height: 'flex', }, }} />
					</Box>
				</Paper>

				{isAlert && <Alert severity="success">저장되었습니다.</Alert>}
				{isError && <Alert severity="error">입력 값을 확인해주세요.</Alert>}
			</Drawer>
		</ThemeProvider >
	);
}