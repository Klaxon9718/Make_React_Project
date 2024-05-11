function SelectPlanOrder(mssql, pool, req, res) {
	// console.log("SelectPlanOrder 실행", req)

	const ship_no = req.body.ship_no
	const plan_order = req.body.plan_order
	const dte_planfrom = req.body.dte_planfrom
	const dte_planto= req.body.dte_planto
	const item_code= req.body.item_code
	const item_name= req.body.item_name

	try {
		console.log("/test/SelectPlanOrder 실행 : 생산계획 정보 조회");
		pool.request()
		.input('DTE_FROM', mssql.VarChar, dte_planfrom)
		.input('DTE_TO', mssql.VarChar,dte_planto)
		.input('ITEM_CODE', mssql.VarChar,item_code)
		.input('ITEM_NAME', mssql.VarChar,item_name)
		.input('PLANORDER_NO', mssql.VarChar,plan_order)
		.input('SHIP_NO', mssql.VarChar,ship_no)
		.execute('SSP_LSH_MID_002_01')
		.then(result => {
			res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
		});
	} catch (error) {
		console.error('PLANORDER 조회중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

function OnePopupSelect (mssql, pool, req, res){
	const ship_no = req.body.code
	try {
		console.log("/test/SelectPlanOrder 실행 : 생산계획 정보 조회");
		pool.request()
		.input('SHIP_NO', mssql.VarChar, ship_no)
		.execute('SSP_LSH_MID_002_02')
		.then(result => {
			res.json(result.recordset);
		})
	} catch (error) {
		console.error('OnePopupSelect 조회중 오류 발생:' + error);
		res.status(500).send({ message: "서버 오류" });
	}
}

module.exports = {
	SelectPlanOrder,
	OnePopupSelect,
}