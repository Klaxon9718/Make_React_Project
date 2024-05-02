import * as React from 'react';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/base/Button';
import { DataGrid } from '@mui/x-data-grid';



function CustPopup ({open, handleCloseCustPopup,labelCode, labelName}) {  
	const columns =[
		{ field: 'CODE', headerName:labelCode, width: 120, editable: true },
		{ field: 'NAME', headerName:labelName, width: 120, editable: true },
	
	];

	const rows = [
		{ id: 1, CODE: '001', NAME: '고객 A' },
		{ id: 2, CODE: '002', NAME: '고객 B' },
		// 데이터 추가가 필요하면 이곳에 추가
	  ];
	

	const modalStyle = {
	  position: 'absolute',
	  top: '50%',
	  left: '50%',
	  transform: 'translate(-50%, -50%)',
	  width: 550,
	  bgcolor: 'background.paper',
	  boxShadow: 24,
	  p: 4,
	};

	return (
		<Draggable>
		  <Modal
			open={open}
			onClose={handleCloseCustPopup}
			// Draggable 라이브러리가 모달과 잘 동작하도록 해주는 스타일
			style={{ overflowY: 'auto' }}
			hideBackdrop='false'
		  >
			  <Box sx={modalStyle}>
				<TextField id="standard-basic" label={labelCode} variant="standard" size="small" sx={{ p: 1, mt: -1 }} />
				<TextField id="standard-basic" label={labelName} variant="standard" size="small" sx={{ p: 1, mt: -1 }} />
				<Button ><SearchIcon /></Button>
				<DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
			  </Box>
		  </Modal>
		  </Draggable>
	  );
}

export default CustPopup;