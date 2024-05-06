import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FilledInput } from '@mui/material';

const defaultTheme = createTheme(); // 테마 적용

//Drawer내부
const DrawerList = (
	<Box sx={{ display: 'flex', width: '100%', height: { xs: 100, sm: 150, md: 250, lg: 300 } }} role="presentation">
		<Paper sx={{ display: 'flex', width: '100%'}} square={false} elevation={3}>
			<TextField id="ship_no" label="수주번호" variant="outlined" size="small" InputProps={{
    readOnly: true,
  }}/>

		</Paper>
	</Box>
);

export default function BottomDrawer(props) {



	return (
		<ThemeProvider theme={defaultTheme}>
			<Drawer anchor={'bottom'} open={props.isopen} onClose={props.onClose}>
				{DrawerList}
			</Drawer>
		</ThemeProvider>
	);
}