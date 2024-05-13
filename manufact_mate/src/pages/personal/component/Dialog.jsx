import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function AlertDialog (props) {
	const [insideD, setInsideD] = React.useState(false)

	const handleClose = () => {
		console.log('handleClose 호출됨');
		props.onClose();
	};

	const handleInsideDClose = () => {
		console.log('handleInsideDClose 호출됨');
		setInsideD(false);
		props.onClose();
	};

	const procedure = async () => {
		for (const emp_code of props.deleteList) {
			try {
				console.log("삭제 전 사원번호 : " + emp_code);
				await axios.post('/test/deletePersonalData', {
					'emp_code': emp_code,
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
						개인정보가 삭제됩니다.
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
