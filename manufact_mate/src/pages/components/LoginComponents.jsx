import * as React from 'react';
import {Avatar, Button,  TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography,  createTheme, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="https://mui.com/">
		  Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }

export const defaultTheme = createTheme();

export const LoginSection = ({getHandleSubmit, getHandleInputId, getHandleInputPw}) => (
  <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={getHandleSubmit}  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
			  onChange={getHandleInputId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"

			  onChange={getHandleInputPw}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container justifyContent="center" >
              <Grid item>
                <Link href="#" variant="body2" >Forgot password?</Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
);