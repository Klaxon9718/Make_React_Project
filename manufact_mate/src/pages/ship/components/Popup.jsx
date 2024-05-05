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



function Popup(props) {
	
	const [Code, SetCode] = React.useState(''); // 코드 검색
	const [Name, SetName] = React.useState('');	// 이름 검색
	const [rows, setRows] = React.useState([]);	// 그리드 행 반환

	const defaultTheme = createTheme();

	const columns = [
		{ field: 'CODE', headerName: props.labelCode, width: 120, editable: false },
		{ field: 'NAME', headerName: props.labelName, width: 120, editable: false },

	];

	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 500,
		height: 540,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	};

	const selectData = async (event) =>{
		event?.preventDefault(); // event가 존재하면 preventDefault() 호출

			await new Promise((r) => setTimeout(r, 0));

		const response = axios.post('/test/popupSelect', {
			'code': Code,
			'name': Name,
			'tname' : props.tname,
			'calcode' : props.calcode,
			'calname' : props.calname,
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

		// 검색어 입력 핸들러 수정 : 이런 식으로 이용하면 값을 setFucntion하나로 다 바꿀 수 있다.
	//onChange={(e) => handleInputChange(e, SetName)}	
	//const handleInputChange = (event, setFunction) => {
	//	setFunction(event.target.value);
	//};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			console.log("엔터 : " + Code);
			selectData();
		}
	};
	
		useEffect(() => {
			selectData();
		}, []);

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
					<TextField id="idCode" label={props.labelCode} variant="standard" size="small" sx={{ p: 1, mt: -1 }} onChange={(event) => SetCode(event.target.value)} onKeyDown={handleKeyDown}/>
					<TextField id="idName" label={props.labelName} variant="standard" size="small" sx={{ p: 1, mt: -1 }} onChange={(event) => SetName(event.target.value)} onKeyDown={handleKeyDown}/>
					<div style={{ height: 400, width: '100%' }}>
					<DataGrid
						getRowId={(row) => row.CODE}
						rowHeight={25}
						rows={rows}
						columns={columns}
						hideFooter
						pageSize={5}
						disableSelectionOnClick
						columnHeaderHeight={25}
						onRowClick={(params) => {
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

export default Popup;