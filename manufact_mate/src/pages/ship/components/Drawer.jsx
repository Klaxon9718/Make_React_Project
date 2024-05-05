import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


export default function BottomDrawer(props) {

	//Drawer내부
	const DrawerList = (
		<Box sx={{  display: 'flex', width: 'flex', height : {xs:100, sm:150, md:250, lg:300} }} role="presentation">
			<Paper square={false} elevation={3}>
				
			</Paper>
		</Box>
	);

	return(
		<Drawer anchor={'bottom'} open={props.isopen} onClose={props.onClose}>
		{DrawerList}
	  	</Drawer>
	);
}