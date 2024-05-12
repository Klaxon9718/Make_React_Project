import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				  }}
			>
				<DialogContent>
				<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              사원 등록
            </Button>
           
          </Box>
        </Box>
      </Container>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>취소</Button>

					{/*확인 안내창 생성*/}
					{insideD && <Dialog open={insideD}  onClose={handleInsideDClose}>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								저장되었습니다.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleInsideDClose}>확인</Button>
						</DialogActions>
						</Dialog>}
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
