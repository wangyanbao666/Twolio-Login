import SourceManager from "./SourceManager.js";
import AuthenticationService from "./AuthenticationService.js";
import CommonResult from "./pojo/CommonResult.js";

const RegisterService = {}
RegisterService.register = async (user) => {
    const phoneNum = user.phoneNum;
    const password= user.password;
    const username = user.username;
    let resBody = new CommonResult();
    let queryRes = await SourceManager.queryByPhoneNum(phoneNum)
    if (queryRes !== null && queryRes !== undefined && queryRes.length > 0){
        if (queryRes[0].verified !== 0){
            resBody.status = 300;
        }
        else {
            resBody.status = 200;
            AuthenticationService.sendAuthenticationCode(phoneNum)
        }
        return resBody;
    }
    console.log("inserting...")
    let insertSuccess = await SourceManager.insertUser(username, phoneNum, password);
    if (insertSuccess){
        console.log("auth")
        AuthenticationService.sendAuthenticationCode(phoneNum)
    }
    resBody.status = 200
    return resBody
}

RegisterService.login = async (user) => {
    let result = new CommonResult();
    let check = await SourceManager.checkUser(user.phoneNum, user.password)
    if (check){
        result.status = 200
    }
    else {
        result.status = 400
    }
    return result
}



export default RegisterService