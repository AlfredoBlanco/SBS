const jwt = require('jsonwebtoken');

interface UserBody {
    name : string;
    email : string;
    role : number;
}

const generateJWT = async (user : UserBody) => {
    const generated = await jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn : '72h',
    });
    
    return generated;
}

const validateJWT = async (token : string) => {
    const user = await jwt.verify(token, process.env.JWT_SECRET);

    return user;
}

module.exports = {
    generateJWT,
    validateJWT,
}