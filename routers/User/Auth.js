const jwt = require('jsonwebtoken')

const Auth = (token) => {
    let decoded = jwt.verify(token, 'shhhhh')
    console.log('token decoded : ', decoded)

    if (decoded.message === "invalid signature") {
        return false
    }
    else {
        return decoded
    }
}

module.exports = Auth;
