import * as React from 'react';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material"
import axios from 'axios';



function OnePopup(props) {
	
	const [Code, SetCode] = React.useState(''); // 코드 검색
	const [rows, setRows] = React.useState([]);
	const [cboShip, setCboShip] = React.useState([]);

	const defaultTheme = createTheme();

		//그리드 CODE에 따른 NAME값 출력
		const findNameByCode = (code, array) => {
			const item = array.find((item) => item.CODE === code);
			return item ? item.NAME : 'Not Found';
		};

			// 수주 콤보박스 리스트 가져옴
	const fetchShipOptions = async () => {
		try {
			const response = await axios.post('/test/cboShipList');
			setCboShip(response.data); // 콤보박스 상태 업데이트
		} catch (error) {
			console.error('Error fetching ship options:', error);
		}
	};

	const columns = [
		{ field: 'SHIP_NO', headerName: '수주번호', width: 120, editable: false },
		{ field: 'SHIP_FLAG', headerName: '수주구분', width: 80, editable: false, valueGetter: (params) => findNameByCode(params, cboShip) },
		{ field: 'ITEM_CODE', headerName: '품목코드', width: 120, editable: false },
		{ field: 'ITEM_NAME', headerName: '품목명', width: 120, editable: false },
		{ field: 'CUST_CODE', headerName: '거래처코드', width: 120, editable: false },
		{ field: 'CUST_NAME', headerName: '거래처명', width: 120, editable: false },
		{ field: 'QTY', headerName: '수주수량',  type: 'number', width: 120, editable: false },
		{ field: 'UNIT', headerName: '단위', width: 60, editable: false },
		{ field: 'SHIP_DATE', headerName: '수주일자', width: 100, editable: false },
		{ field: 'DELI_DATE', headerName: '납품일자', width: 100, editable: false },
		{ field: 'REMARK', headerName: '비고', width: 120, editable: false },
	];

	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 1000,
		height: 540,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	};

	const selectData = async (event) =>{
		event?.preventDefault(); // event가 존재하면 preventDefault() 호출

			await new Promise((r) => setTimeout(r, 0));

		const response = axios.post('/test/OnePopupSelect', {
			'code': Code,
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
			fetchShipOptions();
			selectData();
		}, [Code]);

	return (
		
		
			<ThemeProvider theme={defaultTheme}>
				<Draggable>
			<Modal
				open={props.isopen}
				// Draggable 라이브러리가 모달과 잘 동작하도록 해주는 스타일
				style={{ overflowY: 'auto' }}
				hideBackdrop='false'
			>
				<Box sx={modalStyle}>
					<Box sx={{ position: 'absolute', right: 8, top: 8, }}>
						<CloseIcon onClick={props.onClose} fontSize="large"></CloseIcon>
					</Box>
					<TextField id="idCode" label={'수주번호'} variant="standard" size="small" sx={{ p: 1, mt: -1 }} onChange={(event) => SetCode(event.target.value)}/>
					<div style={{ height: 400, width: '100%' }}>
					전체 행 수 : {rows.length}
					<DataGrid
						getRowId={(row) => row.SHIP_NO}
						rowHeight={25}
						rows={rows}
						columns={columns}
						hideFooter
						pageSize={5}
						disableSelectionOnClick
						columnHeaderHeight={25}
						onRowClick={(params) => {
							console.log("선택 행 출력 ",params.row);
							props.onSelect(params.row); // 선택된 행의 데이터를 onSelect를 통해 전달
							props.onClose(); }}
					/>
					</div>
				</Box>
			</Modal>
			</Draggable>
			</ThemeProvider>
		
	);
}

export default OnePopup;