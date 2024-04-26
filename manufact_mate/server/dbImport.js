// cors설정, 포트 연결
const express = require('express');
const cors = require('cors');
const app = express();
const bodyPaser = require('body-parser');
const {connectToDatabase, outPort} = require("./dbConnection");

const dbImport = () => {
	console.log('load dbImport');

	const corsOptions = {
		origin: ["http://localhost:" + outPort],
		methods: ["GET", "POST", "PUT", "DELETE"], // 대문자 METHODS를 소문자 methods로 수정
	};
	
	app.use(cors(corsOptions));
	
	//UNIX 소켓을 시작하고 지정된 경로에서 연결을 수신, 지정된 호스트 및 포트에서 연결을 바인딩하고 수신
	app.listen(outPort, function (error) {
		if (error) {
			console.error('Failed to start server:', error);
			return;
		}
		console.log('listening on !' + outPort);
	});
};

module.exports = {dbImport, express, cors, app, connectToDatabase, bodyPaser};