import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as LoginComponents from 'src/pages/components/LoginComponents'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <LoginComponents.LoginSection getHandleSubmit={handleSubmit} />
        <LoginComponents.Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;