function getHumanData(mssql, pool, req, res) {
	try {
		console.log("/test/getHumanData 실행s");
		pool.request()
			.input('EMP_CODE', mssql.VarChar, req.body.emp_code)
			.input('EMP_NAME', mssql.VarChar, req.body.emp_name)
			.execute('SSP_HUMAN_SELECT_WEB_001')
			.then(result => {
				console.log("result 데이터 출력 : ", result)
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	} catch (error) {
		console.error('getPpsData 처리 중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

function personaolData(mssql, pool, req, res) {
	try {
		console.log('/test/personaolData 실행');
		pool.request()
			.input('EMP_CODE', mssql.VarChar, req.body.emp_code)
			.input('EMP_NAME', mssql.VarChar, req.body.emp_name)
			.input('PW', mssql.VarChar, req.body.emp_code)
			.input('DEPT_CODE', mssql.VarChar, req.body.dept_no)
			.input('MOBILE', mssql.VarChar, req.body.mobile)
			.input('INS_EMP', mssql.VarChar, req.body.insEmp)
			.execute('USP_HUMAN_WEB_002')
			.then(result => {
				console.log("result 데이터 출력 : ", result)
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	} catch (error) {
		console.error('getPpsData 처리 중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

module.exports = {
	getHumanData,
	personaolData,
}