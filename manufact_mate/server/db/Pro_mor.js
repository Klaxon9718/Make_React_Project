function getProData(mssql, pool, req, res) {
	console.log("getProData 실행", req.body)

	const dte = req.body.dte
	console.log("getProData req값 " + dte)

	try {
		console.log("/test/getProData 실행 : 수주 정보 조회");
		pool.request()
			.input('DTE', mssql.VarChar, dte)
			.execute('SSP_MOR_MOR_003_01')
			.then(result => {
				console.log("result 데이터 출력 : " , result)
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	} catch (error) {
		console.error('getProData 처리 중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

module.exports ={
	getProData,
}