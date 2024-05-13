import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Title from 'src/pages/Home/components/Title';
import axios from 'axios';


export default function Orders() {
	const [rows, setRows] = React.useState([]);

	const handelSelect = async () => {
		console.log("handelSelect 실행");

		await axios.post('/test/selectStore', {
			//전달 값 없음
		})
			.then(function (response) {
				setRows(response.data);
			})
			.catch(function (error) {
				console.error('Error occurred during handelSelect processing:', error.message);
			})
	}

		//그리드 설정
		const columns = [
			{ field: 'LOT_NO', headerName: 'LOT번호', width: 120, editable: false,},
			{ field: 'ITEM_CODE', headerName: '자재코드', width: 120, editable: false },
			{ field: 'ITEM_NAME', headerName: '자재명', width: 120, editable: false },
			{ field: 'CUST_CODE', headerName: '매입처코드', width: 120, editable: false },
			{ field: 'CUST_NAME', headerName: '매입처', width: 150, editable: false },
			{ field: 'IN_DATE', headerName: '입고일자', width: 120, editable: false },
			{ field: 'IN_QTY', headerName: '입고수량',type: 'number', width: 100, editable: false },
			{ field: 'UNIT', headerName: '단위', width: 30, editable: false },
			{ field: 'KG_QTY', headerName: 'KG 환산 중량',type: 'number', width: 100, editable: false },
			{ field: 'LOC_NAME', headerName: '저장위치', width: 80, editable: false },
			{ field: 'ORDER_NO', headerName: '발주번호', width: 120, editable: false },
			{ field: 'ROW_NO', headerName: '행번', width: 80, editable: false },
			{ field: 'PRINT_QTY', headerName: '출력매수', width: 100, editable: false }
		];

	useEffect(() => {
		handelSelect();
	}, []);

	return (
		<React.Fragment>
			<Title>최근 입고</Title>
			<DataGrid
				rows={rows} columns={columns} getRowId={(row) => row.LOT_NO}
				rowHeight={25}
				hideFooter
				
				disableRowSelectionOnClick
				columnHeaderHeight={25}
				sx={{ pagination: false }}
				slots={{
					toolbar: GridToolbar,
				}}
			/>
		</React.Fragment>
	);
}
