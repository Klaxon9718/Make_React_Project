const { dbImport, express, cors, app, connectToDatabase } = require("../dbImport");
dbImport(); //함수 호출

app.use(express.json({ extended: true }));
app.use(cors());

app.get('/api', (req, res) => {
	res.send({ message: 'hello' });
});

app.get('/api/post', (req, res) => {
	const { val1, val2 } = req.body;
	res.send('값 확인 : ' + val1 + val2);
});

connectToDatabase().then(pool => {
	console.log("select실행");
	//GET ALL USERS
	app.get('/test', function (req, res) {
		pool.request()
			.query('SELECT Emp_Code CODE, Emp_Name NAME FROM Emp_Master')
			.then(result => {
				//res.send(result);	// 받아온 데이터 전달
				res.json(result.recordset); //받아온 데이터를 json형식으로 가져옴
			});
	});

	app.get('/api/workorder', function (req, res) {
		pool.request()
		   // .input('DTE_WORK_FROM', mssql.VarChar)
		   // .input('DTE_WORK_TO', mssql.VarChar)
		   // .input('ITEM_CODE', mssql.VarChar)
		   // .input('ITEM_NAME', mssql.VarChar)
		   // .input('WORK_ORDER_NO', mssql.VarChar)
		   // .input('WO_STATUS', mssql.VarChar)
		   // .input('EMP', mssql.VarChar)
		   .execute('dbo.SSP_SCG_MID_004_01')
		   .then((result) => {
			   res.json(result.recordset);
	
		   });
	});
	
});




		



// https://expressjs.com/en/4x/api.html#app.get