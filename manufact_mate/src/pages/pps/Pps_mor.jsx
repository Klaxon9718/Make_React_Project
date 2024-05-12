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
import { LineChart } from '@mui/x-charts/LineChart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
//#endregion

export default function Pps_mor() {

	const defaultTheme = createTheme(); // 테마 적용
	const [data, setData] = useState([]); // 데이터를 상태에 저장

	const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
	async function getData() {
		await axios
			.post('/test/getPpsData', {
				dte: '2023',
			})
			.then(function (response) {
				console.log("그리드 조회 성공", response);
				setData(response.data); // 서버에서 받은 데이터를 상태에 저장
			})
			.catch(function (error) {
				console.error('Error occurred during login processing:', error.message);
			});
	}

	useEffect(() => {
		getData();
	}, []);

	// 서버에서 받은 데이터를 그래프 데이터 형식으로 변환
	const series = data.map(item => ({
		id: item.MODEL.trim(),
		label: item.MODEL,
		data: Object.keys(item)
			.filter(key => key.startsWith('M_'))
			.map(key => item[key] === '' ? 0 : parseFloat(item[key])), // 빈 문자열은 0으로 변환
	}));

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
					<Box sx={{ width: 200, ml: 10, paddingTop: 1 }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							{/*년도 */}
							<DatePicker
								id="shipFrom"
								label="년도"
								views={['year']}
								format="YYYY"
								// value={}
								// onChange={}
								slotProps={{ textField: { size: 'small' } }} />
						</LocalizationProvider>
					</Box>

					<Box sx={{ mt: -1 }}>
						<LineChart
							xAxis={[
								{
									scaleType: 'point', data: months
								},
							]}
							series={series}
							width={1380}
							height={500}
						/>
					</Box>

					{/* <Box>
						<DataGrid>

						</DataGrid>
					</Box> */}

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