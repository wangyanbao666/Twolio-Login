import {default as twilio} from "twilio"
import CommonResult from "./pojo/CommonResult.js";
import SourceManager from "./SourceManager.js";

const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;
const verifySid = process.env.twilio_verifySid;
const client = twilio(accountSid, authToken);


const AuthenticationService = {}
AuthenticationService.sendAuthenticationCode = async (phoneNum) => {
    let verification = await client.verify.v2
    .services(verifySid)
    .verifications.create({ to: "+6584019164", channel: "sms" })
    console.log(verification.status)
}

AuthenticationService.verify = async (phoneNum, otpCode) => {
    let result = new CommonResult();
    try {
        let verification_check = await  client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNum, code: otpCode })
        console.log(verification_check.status)
        if (verification_check.valid){
            result.status = 200
            SourceManager.updateVerificationState(phoneNum)
        }
        else {
            result.status = 300
        }
    }
    catch {
        result.status = 400
    }
    return result
}

export default AuthenticationService
