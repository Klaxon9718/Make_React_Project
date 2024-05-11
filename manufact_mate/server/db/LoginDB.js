const ShipDB = require('./ShipDB');
const CompoDB = require('./CompoDB');
const PlanOrderDB = require('./PlanOrderDB');

const { dbImport, express, cors, app, connectToDatabase, bodyPaser } = require("../dbImport");
dbImport(); //함수 호출
const mssql = require("mssql");
const { application } = require('express');
app.use(express.json({ extended: true }));
app.use(cors());
app.use(bodyPaser.urlencoded({ extended: false }))

connectToDatabase().then(pool => {


//#region ShipDB.js 
	//ShipDB.js : 수주
	//모든 사용자 데이터 가져오기
	//테스트용
	app.get('/test/data', async (req, res) => ShipDB.SelectShipa(pool, req, res));

	//수주 정보 가져오기
	app.post('/test/shipSelect', (req, res) => ShipDB.SelectShip(mssql, pool, req, res));

	//수주 콤보박스 처리
	app.post('/test/cboShipList', (req, res) => ShipDB.CboShipList(pool, req, res));

	//주문유형 콤보박스 처리
	app.post('/test/cboOrderList', (req, res) => ShipDB.CboOrderList(pool, req, res));

	//체크박스 비활성화를 위한 planOrder목록 확인
	app.post('/test/chkPlanList', (req, res) => ShipDB.ChkPlanList(pool, req, res));

	//삭제처리
	app.post('/test/shipDelete', (req, res) => ShipDB.ShipDelete(pool, req, res));


	//Drawer.jsx
	//데이터 삽입 주문 유형 cbo
	app.post('/test/addCboOrderList', (req, res) => ShipDB.AddCboOrderList(pool, req, res));

	//데이터 삽입 수주 유형 cbo
	app.post('/test/addCboShipList', (req, res) => ShipDB.AddCboShipList(pool, req, res));

	//단위
	app.post('/test/getUnit', (req, res) => ShipDB.GetUnit(pool, req, res));

	//데이터 삽입
	app.post('/test/shipSave', (req, res) => ShipDB.ShipSave(mssql, pool, req, res));

	//수정, 삭제를 위한 planOrder 확인
	app.post('/test/DrawerChkPlanOrder', (req, res) => ShipDB.DrawerChkPlanOrder(pool, req, res));


	//CompoDB.js : 컴포넌트 쿼리 실행
	app.post('/test/popupSelect', (req, res) => CompoDB.PopupSelect(mssql, pool, req, res));
//#endregion

//#region PlanOrderDB.js 
	//PlanOrder.jsx
	//생산정보 가져오기
	app.post('/test/selectPlanOrder', (req, res) => PlanOrderDB.SelectPlanOrder(mssql, pool, req, res));

	//작업지시 여부 확인
	app.post('/test/DrawerChkWorkOrder', (req, res) => PlanOrderDB.DrawerChkWorkOrder(pool, req, res));

	//Drawer.jsx
	//저장 수정
	app.post('/test/planOrderSave', (req, res) => PlanOrderDB.PlanOrderSave(mssql, pool, req, res))

	//OnePopup.jsx
	//등록안된 수주정보 가져오기
	app.post('/test/OnePopupSelect', (req, res) => PlanOrderDB.OnePopupSelect(mssql, pool,req, res));

	//Dialog.jsx
	//삭제
	app.post('/test/planOrderDelete', (req, res) => PlanOrderDB.PlanOrderDelete(pool, req, res));

	//#endregion

//#region login.jsx
	//사용자 로그인
	app.post('/test/login', async function (req, res) {
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
				.query('SELECT Emp_Code AS LoginStatus FROM User_Master WHERE User_ID = @User_ID AND User_PW = @User_Pw')
			//#region 로그
			// console.log("사용자 로그인 정보 SELECT : " + result.recordset[0] );
			// console.log(result.recordset[0]);
			// console.log("결과 행 수 : " + result.recordset.length);
			// console.log("로그인 행수 : " + result.recordset[0].LoginStatus);
			//#endregion

			// 조회 결과 검증
			if (result.recordset.length /*&& result.recordset[0].LoginStatus === user_id*/) {
				// 사용자 인증 성공
				return res.status(200).send({ session_id: result.recordset[0].LoginStatus });
			}
			
			// 사용자 인증 실패
			console.log('로그인 실패');
			return res.status(401).send({ message: "로그인 실패" });

		} catch (error) {
			console.error('로그인 처리 중 오류 발생:' + error);
			res.status(500).send({ message: "서버 오류" });
		}
	});
	//#endregion


	});

	// app.use((req, res, next) => {
	// 	console.log(`Received ${req.method} request for ${req.url}`);
	// 	next();
	//   });

	








// https://expressjs.com/en/4x/api.html#app.get
