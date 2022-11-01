export{}
const { Product } = require('../models');

interface ProductBody {
    title : string;
    price : number;
    image : string;
    description : string;
    stock : boolean;
    
}

const allProducts = async () => await Product.find();

const newProduct = async (data : ProductBody) => {

    const newProduct = new Product({ ...data });
        
    await newProduct.save()
}

const oneProduct = async (id : string) => await Product.findById(id);

const productUpdate = async (id : string, data : ProductBody) => await Product.updateOne({_id : id}, { ...data });

const productDelete = async (id : string) => await Product.deleteOne({_id : id});

module.exports = {
    allProducts,
    newProduct,
    oneProduct,
    productDelete,
    productUpdate,
}