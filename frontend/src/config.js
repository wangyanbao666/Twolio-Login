const dev = true
const prefix = dev ? "http://10.0.2.2:3000" : ""

let config = {
    url: {
        REGISTERURL: `${prefix}/register`,
        VERIFYURL: `${prefix}/verification/verify`,
        LOGINURL: `${prefix}/login`
    }
}

export default config