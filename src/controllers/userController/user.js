const UserData = require('../../models/userModel/user')

const addUser = async (req,res)=>{
    try{
    const users = await UserData.find();
    res.status(200).json({msg:'this is get req',data:users})
}catch(e){
    res.status(500).json({msg:'Internal Server Error'})
    }
   
}
const addUser2 = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
         const newDoc = new UserData({ name,email,password });
        await newDoc.save(newDoc)
        res.status(201).json({msg:'this is post req',data:req.body})
}catch(e){
        if(e.errorResponse?e.errorResponse.errmsg.includes('duplicate key error'):false){
            res.status(400).json({msg:'User with this email already exists'})
        }else{
            res.status(500).json({msg:'Internal Server Error'})
    }
    } 
}

const getUserByEmail = async (req,res,next) => { 
    const { email } = req.params;
    try {
        const user = await UserData.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }else {
            return res.status(200).json({ msg: 'User found', data: user });
        }  } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
        }

}
module.exports = [addUser,addUser2,getUserByEmail]