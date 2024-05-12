import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import Popup from 'src/pages/ship/components/Popup';
import Drawer from 'src/pages/ship/components/Drawer';
import Dialog from 'src/pages/ship/components/Dialog';
import { useNavigate } from "react-router-dom";

//#region MUI속성
import Bar from 'src/pages/section/Bar'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
//#endregion

export default function Pro_mor() {

	const navigate = useNavigate(); //#region 사용자 세션처리

	const chk_session = () => {
		if (sessionStorage.getItem('session_id') === null) {
			sessionStorage.clear();
			navigate("/login"); // "/login"으로 이동
		}
	}

	const defaultTheme = createTheme(); // 테마 적용
	const [data, setData] = useState([]); // 데이터를 상태에 저장
	const [date, setDate] = useState(dayjs());
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// 고유한 모델을 추출하여 탭 생성을 위한 배열 생성
	const models = [...new Set(data.map(item => item.MODEL).filter(model => model))];

	// 데이터테이블에 표시할 컬럼 설정
	const columns = [
		{ field: 'SEQ', headerName: 'SEQ', width: 100 },
		{ field: 'ITEM_CODE', headerName: '품목코드', width: 150 },
		{ field: 'ITEM_NAME', headerName: '품목명', width: 150 },
		{ field: 'WC', headerName: '작업장', width: 100 },
		{ field: 'MC', headerName: '생산호기', width: 150 },
		{ field: 'WORK_KG', headerName: '생산실적', type: 'number', width: 100 },
		{ field: 'UNIT', headerName: '단위', type: 'number', width: 100 },
	];

	async function getData() {
		await axios
			.post('/test/getProData', {
				dte: date
			})
			.then(function (response) {
				console.log("그리드 조회 성공", response);
				setData(response.data); // 서버에서 받은 데이터를 상태에 저장
				// 데이터를 성공적으로 받아온 후, models 배열을 업데이트합니다.
				const newModels = [...new Set(response.data.map(item => item.MODEL).filter(model => model))];
				// models 배열이 비어있지 않다면, 첫 번째 모델을 현재 선택된 탭으로 설정합니다.
				if (newModels.length > 0) {
					setValue(newModels[0]);
				} else {
					// 모델이 없는 경우, value를 초기화하거나 다른 처리를 할 수 있습니다.
					setValue('');
				}
			})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			});
	}

	useEffect(() => {
		chk_session();
		getData();
	}, [date]);


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
					<Box sx={{ width: 200, ml: 2, paddingTop: 1 }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							{/*년도 */}
							<DatePicker
								id="shipFrom"
								label="년도"
								views={['year', 'month', 'day']}
								format="YYYY-MM-DD"
								value={date}
								onChange={(newValue) => setDate(newValue)}
								slotProps={{ textField: { size: 'small' } }} />
						</LocalizationProvider>
					</Box>

					<Box sx={{ width: '100%', typography: 'body1' }}>
						<TabContext value={value}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<TabList onChange={handleChange} aria-label="lab API tabs example">
									{models.map((model, index) => (
										<Tab label={model} value={model} key={index} />
									))}
								</TabList>
							</Box>
							{models.map((model, index) => (
								<TabPanel value={model} key={index}>
									<div style={{ height: 400, width: '100%' }}>
										전체 행 수 : {data.length}
										<DataGrid
											rows={data.filter(item => item.MODEL === model)}
											columns={columns}
											getRowId={(row) => row.SEQ}
											hideFooter
											disableColumnSelector
											disableRowSelectionOnClick
											checkboxSelection
											sx={{minHeight : 600, maxHeight: 600}}
										/>
									</div>
								</TabPanel>
							))}
						</TabContext>
					</Box>

				</Paper>
			</Bar>
		</ThemeProvider>

	);
}