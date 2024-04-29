import * as React from 'react';
import {Avatar, Button,  TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography,  createTheme, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//MUI 사용
import { MobileStepper, Paper,  useTheme} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';
//swip사용
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';

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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

// 로그인 Box
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

export function SwipeableTextMobileStepper() {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;
  
	const handleNext = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
  
	const handleBack = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
  
	const handleStepChange = (step) => {
	  setActiveStep(step);
	};
  
	return (
	  <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
		<Paper
		  square
		  elevation={0}
		  sx={{
			display: 'flex',
			alignItems: 'center',
			height: 50,
			pl: 2,
			bgcolor: 'background.default',
		  }}
		>
		  <Typography>{images[activeStep].label}</Typography>
		</Paper>
		<AutoPlaySwipeableViews
		  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
		  index={activeStep}
		  onChangeIndex={handleStepChange}
		  enableMouseEvents
		>
		  {images.map((step, index) => (
			<div key={step.label}>
			  {Math.abs(activeStep - index) <= 2 ? (
				<Box
				  component="img"
				  sx={{
					maxHeight:800,
					height: 'flex',
					display: 'block',
					maxWidth: 500,
					overflow: 'hidden',
					width: '100%',
				  }}
				  src={step.imgPath}
				  alt={step.label}
				/>
			  ) : null}
			</div>
		  ))}
		</AutoPlaySwipeableViews>
		<MobileStepper
		  steps={maxSteps}
		  position="static"
		  activeStep={activeStep}
		  nextButton={
			<Button
			  size="small"
			  onClick={handleNext}
			  disabled={activeStep === maxSteps - 1}
			>
			  Next
			  {theme.direction === 'rtl' ? (
				<KeyboardArrowLeft />
			  ) : (
				<KeyboardArrowRight />
			  )}
			</Button>
		  }
		  backButton={
			<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
			  {theme.direction === 'rtl' ? (
				<KeyboardArrowRight />
			  ) : (
				<KeyboardArrowLeft />
			  )}
			  Back
			</Button>
		  }
		/>
	  </Box>
	);
  }
  
  