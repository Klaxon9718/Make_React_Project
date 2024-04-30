import Bar from 'src/pages/section/Bar'
import Paper from '@mui/material/Paper';


export default function Ship() {
    return (
      <div>
		<Bar>
		<Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
        </Paper>
		</Bar>
      </div>
    );
  }
  