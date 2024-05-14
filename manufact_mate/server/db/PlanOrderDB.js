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

function DrawerChkWorkOrder (pool, req, res) {
	console.log("DrawerChkPlanOrder 실행");
	query = "SELECT 1 as isValied FROM WORKORDER_ED WHERE PLAN_ORDER_NO = '" + req.body.planOrder_no + "'"
	pool.request()
	.query(query)
	.then(result => {
		console.log("DrawerChkWorkOrder 진입");
		console.log("DrawerChkWorkOrder 진입", result);
		if(result.recordset.length > 0){ 
			console.log("DrawerChkWorkOrder 진입 숫자", result.recordset[0].isValied);
			res.json(result.recordset[0].isValied);
		}
		else{
			console.log("DrawerChkWorkOrder else 숫자", result.recordset[0]);
			res.json(result.recordset[0]);
		}

})
}

//저장
function PlanOrderSave(mssql, pool, req, res) {
	console.log("PlanOrderSave 실행");
	console.log("PlanOrderSave body : " + req.body.ORDER_FLAG)
	console.log("PlanOrderSave 실행" , req.body);


	pool.request()
	.input('PLANORDER_NO', mssql.VarChar,req.body.PLANORDER_NO)
	.input('SHIP_NO', mssql.VarChar,req.body.SHIP_NO)
	.input('CUST_CODE', mssql.VarChar,req.body.CUST_CODE)
	.input('ITEM_CODE', mssql.VarChar,req.body.ITEM_CODE)
	.input('PLAN_QTY', mssql.Float,req.body.PLAN_QTY)
	.input('PLANINS_EMP_CODE', mssql.VarChar,req.body.PLANINS_EMP_CODE)
	.input('PLAN_DATE', mssql.VarChar,req.body.PLAN_DATE)
	.input('DELI_DATE', mssql.VarChar,req.body.DELI_DATE)
	.input('RE_CONTENT', mssql.VarChar,req.body.RE_CONTENT)
	.input('INS_EMP', mssql.VarChar,req.body.INS_EMP)
	.input('UP_EMP', mssql.VarChar,req.body.UP_EMP)
	.execute('USP_LSH_MID_002_01')
	.then(result => {
		res.status(200).json({ message: "성공적으로 저장되었습니다." });
})
.catch(error => {
    // 에러 처리
    console.error("데이터베이스 작업 중 에러 발생:", error);
    res.status(500).json({ error: "서버 내부 에러." });
});
}

//삭제
function PlanOrderDelete (pool, req, res){
	console.log("ShipDelete 실행", req.body.planOrder_no);
	query = "DELETE FROM PLANORDER_ED WHERE PLAN_ORDER_NO = '" + req.body.planOrder_no +"'"
	pool.request()
	.query(query)
	.then(result => {
		res.status(200).send({ message: "삭제 완료" });
	})
}

function chkWorkOrderList (pool, req, res){
	console.log("chkWorkOrderList 실행");
	query = "SELECT DISTINCT PLAN_ORDER_NO FROM WORKORDER_ED"
	pool.request()
	.query(query)
	.then(result => {
		console.log(result.recordset);
		return res.json(result.recordset);
	})
}

module.exports = {
	SelectPlanOrder,
	OnePopupSelect,
	DrawerChkWorkOrder,
	PlanOrderDelete,
	PlanOrderSave,
	chkWorkOrderList,
}