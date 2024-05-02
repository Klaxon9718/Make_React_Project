//#region import문
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from 'src/pages/Home/components/Chart';
import Deposits from 'src/pages/Home/components/Deposits';
import Orders from 'src/pages/Home/components/Orders';
import Bar from 'src/pages/section/Bar'
import { useNavigate } from "react-router-dom";
//#endregion

const defaultTheme = createTheme();

export default function Home() {

const [data, setData] = useState('')	

const navigate = useNavigate(); //#region 사용자 세션처리

const chk_session = () => {
	if (sessionStorage.getItem('session_id') === null ){
		sessionStorage.clear();
		navigate("/login"); // "/login"으로 이동
	}
}
//#endregion

const selectList = async () => {
	try {
		const response = await axios.get('/test/');
		setData(response.data); // 받아온 데이터를 상태에 저장
		console.log(data); // 콘솔에 데이터 출력
	} catch (error) {
		console.error('데이터를 불러오는 데 실패했습니다.', error);
	}
};

//https://velog.io/@chaeshee0908/React-Axios%EB%A1%9C-User-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%9B%EC%95%84-%EC%B6%9C%EB%A0%A5%ED%95%98%EA%B8%B0
// 페이지 렌더링 후 가장 처음 호출되는 함수
React.useEffect(() => {
	chk_session();
	selectList();
  }, []); // 빈 배열을 


  return (
	
	<Bar>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
	</Bar>

  );
}