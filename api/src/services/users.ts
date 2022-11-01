export {}
const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


interface UserBody {
    _id ?: string;
    name : string;
    email : string;
    password : string;
    role : number;
}


const createUser = async({ name, email, password, role = 2 } : UserBody) => {
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password : passwordHash, role});
    
    await newUser.save();
}

const loginUser = async(passwordSent : string, { password, _id, email, role } : UserBody) => {
    let token = '';
    try{
        if(!passwordSent) return { error : 'Not password sent'};
        
        const result = await bcryptjs.compare(passwordSent, password);

        if(!result) return { error : 'Incorrect password' };
        
        token = await generateJWT({ _id, email, role});
        
        return { token };

    } catch(e) {
        return { error : "Couldn't generate the token" };
    }
}

const findByEmail = async(email : string) => await User.find({ email });

module.exports = {
    createUser,
    findByEmail,
    loginUser,
}