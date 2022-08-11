import mongoose from 'mongoose';
require('dotenv').config();

const DB_URL : string = String(process.env.DB_URL);
try{
    
    mongoose.connect(DB_URL)
    .then(db => console.log('DB is connected'));

}catch (e) {
    console.log('Error occurred', e)
}
