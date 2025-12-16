const UserData = require('../../models/userModel/user');
const GroupData = require('../../models/groupModel/group');

const createGroup =async(req,res)=>{
    const {name,members} = req.body;
    console.log(name,members);
    const createdBy = req.user.id;
    let users =[];
    try{
    for (const email of members) {
        const user = await UserData.findOne({email:email});
         console.log("---------",typeof((user._id).toString()));
            if(!user){
                return res.status(404).json({msg:`User with email ${email} not found`});
            }
            if(user){
                users.push((user._id).toString());
            }
    }
        console.log(users);
        const newGroup =await new GroupData({name:name,members:users,createdBy:createdBy});
        console.log('newGroup',newGroup);
        await newGroup.save();
        console.log('saved');
        return res.status(201).json({msg:'Group created successfully',data:newGroup});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Internal Server Error'});
    }
}

const getGroups = async(req,res)=>{
    const userId = req.user.id;
    try{
        const groups = await GroupData.find({$or:[{members:userId},{createdBy:userId}]}).populate('members','name email').populate('createdBy','name email');
        return res.json({Groups:groups})
        console.log(groups)
    }catch(e){

    }
}

module.exports=[createGroup,getGroups];