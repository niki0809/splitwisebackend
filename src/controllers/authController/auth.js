const jsonwebtoken =  require('jsonwebtoken');
const UserData = require('../../models/userModel/user');
const bcrypt = require('bcrypt');
const jwtsecret = process.env.JWT_SECRET||'splitwisesecret123'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN||'1h';
const register = async (req, res) => {
    const { name, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    try {
        const newDoc = new UserData({ name, email, password });
        await newDoc.save(newDoc)
        res.status(201).json({ msg: 'this is post req', data: req.body })
    } catch (e) {
        if (e.errorResponse ? e.errorResponse.errmsg.includes('duplicate key error') : false) {
            res.status(400).json({ msg: 'User with this email already exists' })
        } else {
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;  
    try{
        const user = await UserData.findOne({ email: email });
        if(!email || !password){
            return res.status(400).json({ msg: 'Please provide email and password' });
        }
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        let match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        // console.log(process.env.JWT_SECRET,process.env.JWT_EXPIRES_IN)
        const token = jsonwebtoken.sign({ userId: user._id }, jwtsecret, { expiresIn: JWT_EXPIRES_IN });
        return res.status(200).json({ msg: 'Login successful', token : token });

    }catch(e){
        return res.status(500).json({ msg: 'Internal Server Error',error:e });
    }

}

module.exports = [ register,login ];  