const ShipDB = require('./ShipDB');

const { dbImport, express, cors, app, connectToDatabase, bodyPaser } = require("../dbImport");
dbImport(); //함수 호출
const mssql = require("mssql");
app.use(express.json({ extended: true }));
app.use(cors());
app.use(bodyPaser.urlencoded({ extended: false }))

connectToDatabase().then(pool => {


	//ShipDB.js : 수주
	//모든 사용자 데이터 가져오기
	app.get('/test/data', async (req, res) => ShipDB.SelectShipa(pool, req, res));

	app.get('test/ship/select', (req, res) => ShipDB.SelectShip(pool, req, res));


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

	// app.use((req, res, next) => {
	// 	console.log(`Received ${req.method} request for ${req.url}`);
	// 	next();
	//   });

	//사용자 로그인
	app.post('/test/01', async function (req, res) {
		console.log("Login실행");

		// 요청에서 사용자 아이디와 패스워드 추출
		const user_id = req.body.id;
		const user_pw = req.body.pw;

		console.log("사용자 아이디 확인용 로그 " + user_id);
		console.log("사용자 비밀번호 확인용 로그 " + user_pw);

		try {
			// SQL 쿼리 실행
			const result = await pool.request()
				.input('User_ID', mssql.VarChar, user_id)
				.input('User_Pw', mssql.VarChar, user_pw)
				.query('SELECT User_ID AS LoginStatus FROM User_Master WHERE User_ID = @User_ID AND User_PW = @User_Pw')
			//#region 로그
			// console.log("사용자 로그인 정보 SELECT : " + result.recordset[0] );
			// console.log(result.recordset[0]);
			// console.log("결과 행 수 : " + result.recordset.length);
			// console.log("로그인 행수 : " + result.recordset[0].LoginStatus);
			//#endregion

			// 조회 결과 검증
			if (result.recordset.length && result.recordset[0].LoginStatus === user_id) {
				// 사용자 인증 성공
				return res.status(200).send({ session_id: user_id });
			}
			
			// 사용자 인증 실패
			console.log('로그인 실패');
			return res.status(401).send({ message: "로그인 실패" });

		} catch (error) {
			console.error('로그인 처리 중 오류 발생:' + error);
			res.status(500).send({ message: "서버 오류" });
		}
	});

});








// https://expressjs.com/en/4x/api.html#app.get
