const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(403).json({
            error: 'please provide a token'
        })
    }
    if (token.toLowerCase().startsWith('bearer ')) {
        token = token.slice('bearer '.length).trim()
    }
    const jwtPayload = jwt.verify(token, 'secret_key')

    if (!jwtPayload) {
        return res.status(403)({
            error: 'unauthenticated'
        })
    }

    res.user = jwtPayload

    next()
}

module.exports = checkToken