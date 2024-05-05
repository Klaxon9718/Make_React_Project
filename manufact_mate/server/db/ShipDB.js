const { PoolOutlined } = require("@mui/icons-material")

function SelectShip(mssql, pool, req, res) {

	const dte_shipfrom = req.body.dte_shipfrom
	const dte_shipto= req.body.dte_shipto
	const dte_delidate= req.body.dte_delidate
	const dte_delito= req.body.dte_delito
	const shipflag= req.body.shipflag
	const orderflag= req.body.orderflag
	const cust_code= req.body.cust_code
	const cust_name= req.body.cust_name
	const item_code= req.body.item_code
	const item_name= req.body.item_name
	console.log("selectShip req값 " + dte_shipfrom)

	try {
	console.log("/test/SelectShip 실행 : 수주 정보 조회");
	pool.request()
	.input('DTE_SHIPFROM', mssql.VarChar, dte_shipfrom)
	.input('DTE_SHIPTO', mssql.VarChar,dte_shipto)
	.input('DTE_DELIDATE', mssql.VarChar,dte_delidate)
	.input('DTE_DELITO', mssql.VarChar,dte_delito)
	.input('SHIPFLAG', mssql.VarChar,shipflag)
	.input('ORDERFLAG', mssql.VarChar,orderflag)
	.input('CUST_CODE', mssql.VarChar,cust_code)
	.input('CUST_NAME', mssql.VarChar,cust_name)
	.input('ITEM_CODE', mssql.VarChar,item_code)
	.input('ITEM_NAME', mssql.VarChar,item_name)
	.execute('SSP_LSH_MID_001_01')
	.then(result => {
		res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
	});
} catch (error) {
	console.error('로그인 처리 중 오류 발생:' + error);
	res.status(500).send({ message: "서버 오류" });
}
}


function SelectShipa(pool, req, res) {
	console.log("/test/data실행");
	pool.request()
		.query('SELECT Emp_Code CODE, Emp_Name NAME FROM Emp_Master')
		.then(result => {
			//res.send(result);	// 받아온 데이터 전달
			return res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
		});
}

function CboShipList(pool, req, res){
	console.log("/test/CboShipList실행");
	pool.request()
	.query("SELECT '' CODE, '전체' NAME " + 
	"UNION ALL SELECT UserDefine_Mi_Code CODE, UserDefine_Mi_Name NAME " + 
	"FROM UserDefine_Mi_Master WHERE UserDefine_Ma_Code = 'SAL_TYPE'")
	.then(result => {
		return res.json(result.recordset);
	})
}

function CboOrderList(pool, req, res){
	console.log("/test/CboOrderList실행");
	pool.request()
	.query("SELECT '' CODE, '전체' NAME " + 
	"UNION ALL SELECT UserDefine_Mi_Code CODE, UserDefine_Mi_Name NAME " + 
	"FROM UserDefine_Mi_Master WHERE UserDefine_Ma_Code = 'SOTYPE'")
	.then(result => {
		return res.json(result.recordset);
	})
}


module.exports = {
	SelectShip,
	SelectShipa,
	CboShipList,
	CboOrderList,
}