
function selectPersonalData ( pool, req, res){
	try {
		console.log("/test/selectPersonalData 실행s");
		let query = "select "+
		"EM.Emp_Code EMP_CODE, EM.Emp_Name EMP_NAME, EM.Dept_Code DEPT_CODE, EM.Emp_Mail EMAIL,	EM.MobileNo MOBILE, UM.User_PW PW " +
		"FROM Emp_Master EM LEFT OUTER JOIN User_Master UM on EM.Emp_Code = UM.Emp_Code " +
		"WHERE EM.Emp_Code = '" + req.body.emp_code + "'"
		pool.request()
			.query(query)
			.then(result => {
				console.log("selectPersonalData 데이터 출력 : ", result)
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	} catch (error) {
		console.error('selectPersonalData 처리 중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

function deletePersonalData (pool, req, res){
	try {
		console.log("/test/deletePersonalData 실행s");
		let query = "delete from user_master where emp_code = '" + req.body.emp_code +"' " +
					"delete from emp_master where emp_code = '" + req.body.emp_code + "'"
		pool.request()
			.query(query)
			.then(result => {
				console.log("deletePersonalData 데이터 출력 : ", result)
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	} catch (error) {
		console.error('deletePersonalData 처리 중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

module.exports ={
	selectPersonalData,
	deletePersonalData,
}