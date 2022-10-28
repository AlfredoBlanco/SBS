export {}
const { User } = require('../models');
const bcryptjs = require('bcryptjs');


interface UserBody {
    name : string;
    email : string;
    password : string;
    passwordConfirm : string;
    role : number;
}

const createUser = async({ name, email, password, role = 2 } : UserBody) => {
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password : passwordHash, role});
    
    await newUser.save();
}

const findByEmail = async(email : string) => await User.find({ email });

module.exports = {
    createUser,
    findByEmail,
}