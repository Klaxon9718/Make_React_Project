function selectStore(pool, req, res) {
	console.log("selectStore 실행");

	try {
		// SQL 쿼리 실행
		pool.request()
			.execute('SSP_HOME_GRID_WEB_01')
			.then(result => {
				console.log("result 데이터 출력 저장 및 수정: ", result)
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	} catch (error) {
		console.error('selectStore 처리 중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

module.exports = {
	selectStore,
}
