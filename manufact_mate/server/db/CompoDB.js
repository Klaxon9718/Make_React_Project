function PopupSelect (mssql, pool, req, res) {

	const tname = req.body.tname
	const calcode = req.body.calcode
	const calname = req.body.calname
	const code = req.body.code
	const name = req.body.name

	query = "SELECT " + calcode +" CODE, " + calname + " NAME FROM " + tname + " WHERE (1=1) "
	if ((code != '')) {
		query += "AND " + calcode + " LIKE '%' + '" + code + "' +'%' " 
	}
	if ((name != '')) {
		query += " AND (" + calname + " LIKE '%' + '" + name + "' +'%')" 
	}
	
	console.log("PopupSelect req값 " + name);
	console.log("PopupSelect 쿼리 : " + query);
	console.log("/test/PopupSelect 실행 : 팝업 조회");
	pool.request()
	.query(query)
	.then(result => {
		console.log()
		res.json(result.recordset);
	})
	
}

module.exports = {
	PopupSelect,
}