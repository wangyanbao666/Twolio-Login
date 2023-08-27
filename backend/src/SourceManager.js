import mysql from "mysql2"
import * as queries from "./query.js"
import dotenv from "dotenv"
dotenv.config()


let con = mysql.createConnection(
    {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database
    }
)

con.connect((err) => {
    if (err){
        throw err
    }
    console.log("connected")
})

con.query(
    queries.createUserTable, (err)=>{
        if (err){
            throw err
        }
        console.log("user tabble created")
    }
)

const SourceManager = {}
SourceManager.queryByPhoneNum = async (phoneNum) => {
    const results = await con.promise().query(queries.selectUserByPhoneNum,[phoneNum])
    console.log(results[0])
    return results[0]
}

SourceManager.insertUser = async (username, phoneNum, password) => {
    try {
        const result = await con.promise().query(queries.insertUser, [username, phoneNum, password])
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
}

SourceManager.updateVerificationState = async (phoneNum) => {
    try {
        const result = await con.promise().query(queries.updateVerificationState, [phoneNum])
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
}

SourceManager.checkUser = async (phoneNum, password) => {
    const result = await con.promise().query(queries.checkUser, [phoneNum, password])
    if (result[0].length>0){
        return true
    }
    return false
}

export default SourceManager;