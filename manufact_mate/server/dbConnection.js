// dbConnection.js
// 디비 연결
const mssql = require("mssql");
const {outPort, dbConfig} = require("./dbConfig");

const connectToDatabase = async () => {
    try {
        const pool = await mssql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

module.exports = {connectToDatabase, outPort}
