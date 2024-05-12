import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import Popup from 'src/pages/ship/components/Popup';
import Drawer from 'src/pages/ship/components/Drawer';
import Dialog from 'src/pages/ship/components/Dialog';
import { useNavigate } from "react-router-dom";
import AddHuman from 'src/pages/human_resources/component/AddHuman'

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

	const [emp, setEmp] = React.useState({ CODE: '', NAME: '' });
	const [rows, setRows] = React.useState([]);

	const [isAddModal, setIsAddModal] =  React.useState(false);

	//그리드 설정
	const columns = [
		{ field: 'EMP_CODE', headerName: '사원번호', width: 120, editable: false },
		{ field: 'EMP_NAME', headerName: '사원 명', width: 80, editable: false },
		{ field: 'DEPT_NAME', headerName: '부서 명', width: 120, editable: false },
		{ field: 'EMAIL', headerName: '이메일 주소', width: 200, editable: false },
		{ field: 'MOBILE', headerName: '휴대전화', width: 150, editable: false },
	];

	const getHumanData = async () => {
		await axios.post('/test/getHumanData', {
			'emp_code': '',
			'emp_name': ''
		}).then(function (response) {
			//console.log("그리드 조회 성공 " + response.status);
			setRows(response.data);
		})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			})
	}

	const ClickAddHuman = () => {
		setIsAddModal(true)
	}

	// 팝업을 닫기 위한 범용 함수
	const handleClosePopup = (setPopupState) => {
		setPopupState(false);
	};


	const defaultTheme = createTheme(); // 테마 적용

	useEffect(() => {
		getHumanData();
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
					<Box>
						<TextField id="standard-basic" label="사원번호" value={emp.CODE} variant="standard" size={"small"} sx={{ p: 1, mt: -1 }} />
						<TextField id="standard-basic" label="사원명" value={emp.NAME} variant="standard" size={"small"} sx={{ p: 1, mt: -1, editable: true }} />
						<Button variant="outlined" sx={{ mr: 2 }} onClick={ClickAddHuman}>신규 사원추가</Button>
						{isAddModal && <AddHuman isopen={isAddModal} onClose={() => handleClosePopup(setIsAddModal)} ></AddHuman>}
					</Box>

					<Box>
						<DataGrid
							rows={rows}
							columns={columns}
							getRowId={(row) => row.EMP_CODE}
							hideFooter
							sx={{ width: 800, minHeight:720, maxHeight:720 }}
						>
						</DataGrid>

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