import mongoose from 'mongoose';
/* https://www.youtube.com/watch?v=-bI0diefasA Minuto 41:23 */
try{

    mongoose.connect('mongodb://localhost/products')
    .then(db => console.log('DB is connected'));

}catch (e) {
    console.log('Error occurred', e)
}
