function SelectShip(pool, req, res) {
	console.log("/test/SelectShip 실행 : 수주 정보 조회");
	pool.request()
		.execute('dbo.SSP_MID_006')
		.then(result => {
			//res.send(result);	// 받아온 데이터 전달
			res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
		});
}


function SelectShipa(pool, req, res) {
	console.log("/test/data실행");
	pool.request()
		.query('SELECT Emp_Code CODE, Emp_Name NAME FROM Emp_Master')
		.then(result => {
			//res.send(result);	// 받아온 데이터 전달
			res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
		});
}


module.exports = {
	SelectShip,
}