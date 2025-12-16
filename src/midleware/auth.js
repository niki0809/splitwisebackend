
const jsonwebtoken = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET||'splitwisesecret123'
const authMiddleware = (req,res,next)=>{
    //middleware logic here
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authorization.split(' ')[1];
    try {
        const decoded = jsonwebtoken.verify(token, jwtsecret);
        console.log({decoded});
        req.user = { id: decoded.userId };
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
    next();
}

module.exports = authMiddleware;