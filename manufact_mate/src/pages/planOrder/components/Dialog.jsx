import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
	const [insideD, setInsideD] = React.useState(false)

	const handleClose = () => {
		props.onClose();
	};

	const handleInsideDClose = () => {
		setInsideD(false);
		props.onClose();
	};

	const procedure = async () => {
		for (const ship_no of props.deleteList) {
			try {
				console.log("삭제 전 SHIP_NO : " + ship_no);
				await axios.post('/test/shipDelete', {
					'SHIP_NO': ship_no,
				})
					.then(function (response) {
						console.log("데이터 삭제 완료 " + response.status)
					})
					.catch(function (error) {
						console.error('Error occurred during AlertDialog processing:', error.message);
					})
			} catch (error) {
				console.error('Error occurred during AlertDialog processing:', error.message);
			}
		}
		setInsideD(true)
	}

	useEffect(() => {

	}, []);

	return (
		<React.Fragment>
			<Dialog
				open={props.isopen} // props에서 open 상태를 받음
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						데이터를 삭제합니다.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>아니오</Button>
					<Button onClick={procedure} autoFocus>예</Button>

					{/*확인 안내창 생성*/}
					{insideD && <Dialog open={insideD}  onClose={handleInsideDClose}>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								삭제되었습니다.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleInsideDClose}>확인</Button>
						</DialogActions></Dialog>}


				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
