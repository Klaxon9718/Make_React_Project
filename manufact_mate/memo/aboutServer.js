// const express = require('express');

// const app = express();
// app.listen(8081, function () {
//     console.log('listening on 8081')
// });

// // mssql 연동 -> 실제 본인의 mssql 값 작성해주면 됩니다.
// var mssql = require("mssql");
// var dbConfig_user = {
//     server: "xxxx",
//     database: "xxxx",
//     user: "xxxx",
//     password: "xxxx",
//     port: xxxx,
//     options: {      // Setting the TLS ServerName to an IP address is not permitted by RFC 6066. 오류 해결
//         encrypt: false,
//         trustServerCertificate: true,
//     } 
// };

// mssql.connect(dbConfig_user, function(err){
//     if(err){
//         return console.error('error : ', err);
//     }
//     console.log('MSSQL 연결 완료')
// });

// //https://dhdl-it.tistory.com/65
// //포트번호 확인 : sql serverConfiguration manager > sql server 네트워크 구성 > MSSQLSERVER에 대한 프로토콜 > TCP/IP 클릭 > IP주소 > IPALL의 TCP포트 번호
// // 서버 연결 : node server/server.js