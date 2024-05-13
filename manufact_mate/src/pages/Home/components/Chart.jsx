import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

import { LineChart } from '@mui/x-charts/LineChart';

import Title from 'src/pages/Home/components/Title';

export default function Chart() {

  const [data, setData] = useState([]); // 데이터를 상태에 저장
  const [year, setYear] = useState(dayjs());

  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  const columns = [
	  { field: 'MODEL', headerName: '품목명', width: 150 },
	  { field: 'M_1', headerName: '1월', width: 100 },
	  { field: 'M_2', headerName: '2월', width: 100 },
	  { field: 'M_3', headerName: '3월', width: 100 },
	  { field: 'M_4', headerName: '4월', width: 100 },
	  { field: 'M_5', headerName: '5월', width: 100 },
	  { field: 'M_6', headerName: '6월', width: 100 },
	  { field: 'M_7', headerName: '7월', width: 100 },
	  { field: 'M_8', headerName: '8월', width: 100 },
	  { field: 'M_9', headerName: '9월', width: 100 },
	  { field: 'M_10', headerName: '10월', width: 100 },
	  { field: 'M_11', headerName: '11월', width: 100 },
	  { field: 'M_12', headerName: '12월', width: 100 },
  ];

  const rows = data.map((item, index) => ({ id: index, ...item }));

  async function getData() {
	  await axios
		  .post('/test/getPpsData', {
			  dte: year.format("2023"),
		  })
		  .then(function (response) {
			  console.log("그리드 조회 성공", response);
			  setData(response.data); // 서버에서 받은 데이터를 상태에 저장
		  })
		  .catch(function (error) {
			  console.error('Error occurred during login processing:', error.message);
		  });
  }

  useEffect(() => {
	  getData();
	  console.log("날짜 변경 ", year);
  }, [year]);

  // 서버에서 받은 데이터를 그래프 데이터 형식으로 변환
  const series = data.map(item => ({
	  id: item.MODEL.trim(),
	  data: Object.keys(item)
		  .filter(key => key.startsWith('M_'))
		  .map(key => item[key] === '' ? 0 : parseFloat(item[key])), // 빈 문자열은 0으로 변환
  }));

  return (
    <React.Fragment>
      <Title>2023 생산현황</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
	  <LineChart
							xAxis={[
								{
									scaleType: 'point', data: months
								},
							]}
							series={series}
							width={1200}
							height={300}
						/>
      </div>
    </React.Fragment>
  );
}
