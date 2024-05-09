const { PoolOutlined } = require("@mui/icons-material")

//수주 그리드 조회
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


//테스트용
function SelectShipa(pool, req, res) {
	console.log("/test/data실행");
	pool.request()
		.query('SELECT Emp_Code CODE, Emp_Name NAME FROM Emp_Master')
		.then(result => {
			//res.send(result);	// 받아온 데이터 전달
			return res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
		});
}


//조회용 : 수주 콤보박스 불러오는 용도 ('전체' 포함)
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

//조회용 : 주문 유형 콤보박스 불러오는 용도 ('전체' 포함)
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


//삽입용 : 수주 콤보박스 불러오는 용도 ('전체' 미포함)
function AddCboOrderList(pool, req, res){
	console.log("AddCboShipList 실행");
	pool.request()
	.query(	"SELECT UserDefine_Mi_Code CODE, UserDefine_Mi_Name NAME " + 
			"FROM UserDefine_Mi_Master WHERE UserDefine_Ma_Code = 'SAL_TYPE'")
	.then(result => {
		return res.json(result.recordset);
	})
}

//삽입용 : 주문유형 콤보박스 불러오는 용도 ('전체' 미포함)
function AddCboShipList(pool, req, res){
	console.log("AddCboOrderList 실행");
	pool.request()
	.query(	"SELECT UserDefine_Mi_Code CODE, UserDefine_Mi_Name NAME " + 
			"FROM UserDefine_Mi_Master WHERE UserDefine_Ma_Code = 'SOTYPE'")
	.then(result => {
		return res.json(result.recordset);
	})
}

// 단위 호출
function GetUnit(pool, req, res){
console.log("GetUnit 실행");
console.log(req.body.code +  "코드 값");

query = "SELECT UM.UserDefine_Mi_Name NAME FROM Item_Master IM LEFT OUTER JOIN UserDefine_Mi_Master UM ON IM.Item_Manage_Unit = UM.UserDefine_Mi_Code AND UM.UserDefine_Ma_Code = 'ITEMUNIT' WHERE Item_code = '" + 
	req.body.code + "'";

pool.request()
.query(query)
.then(result => {
	console.log(result);// => 객체 덩어리가 나옴
	//console.log("GetUnit 결과 : " + result.recordset[0])
	//console.log("GetUnit 결과 : " + result.recordsets)
	return   res.json( result.recordset[0].NAME)	
})
}

// 저장
function ShipSave(mssql, pool, req, res){
	console.log("ShipSave 실행");
	console.log("shipsave body : " + req.body.ORDER_FLAG)

	pool.request()
	.input('SHIP_NO', mssql.VarChar,req.body.SHIP_NO)
	.input('SHIP_FLAG', mssql.VarChar,req.body.SHIP_FLAG)
	.input('ORDER_FLAG', mssql.VarChar,req.body.ORDER_FLAG)
	.input('CUST_CODE', mssql.VarChar,req.body.CUST_CODE)
	.input('ITEM_CODE', mssql.VarChar,req.body.ITEM_CODE)
	.input('QTY', mssql.VarChar,req.body.QTY)
	.input('SHIP_DATE', mssql.VarChar,req.body.SHIP_DATE)
	.input('DELI_DATE', mssql.VarChar,req.body.DELI_DATE)
	.input('REMARK', mssql.VarChar,req.body.REMARK)
	.input('SHIPINS_EMP', mssql.VarChar,req.body.SHIPINS_EMP)
	.input('INS_EMP', mssql.VarChar,req.body.INS_EMP)
	.input('UP_EMP', mssql.VarChar,req.body.UP_EMP)
	.execute('USP_LSH_MID_001_01')
	}

function ChkPlanList (pool, req, res){
	console.log("ChkPlanList 실행");
	query = "SELECT DISTINCT SHIP_NO FROM PLANORDER_ED"
	pool.request()
	.query(query)
	.then(result => {
		return res.json(result.recordset);
	})
}

module.exports = {
	SelectShip,
	SelectShipa,
	CboShipList,
	CboOrderList,
	AddCboShipList,
	AddCboOrderList,
	GetUnit,
	ShipSave,
	ChkPlanList,
}