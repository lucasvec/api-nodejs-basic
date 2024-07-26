const Product = require("../models/productModel");

function insertProduct(product) {
    try{
        const result = Product.addProduct(product.id, product.name, product.price, product.category);
        return result;
    }catch (error){
        throw new Error(`Error when inserting products. Details: ${error}.`);
    }
}

async function listProducts(){
    try{
        const result = await Product.getProducts();
        return result;
    }catch (error){
        throw new Error(`Error listing products. Details: ${error}.`);
    }
}

async function findById(id){
    try{
        const result = await Product.getProductById(id);
        return result;
    }catch (error){
        throw new Error(`Error listing product. Details: ${error}.`);
    }
}

async function deleteProduct(product) {
    try{
        const result = await Product.removeProduct(product.id);
        return result;
    }catch(error){
        throw new Error(`Error when deleting product. Details: ${error}.`);
    }
}

async function updateProductName(id, newName){
    try{
        const result = await Product.modifyProductName(id, newName);
        return result;
    }catch(error){
        throw new Error(`Error updating product. Details: ${error}.`);
    }
}

async function updateProductPrice(id, newPrice){
    try{
        const result = await Product.modifyProductPrice(id, newPrice);
        return result;
    }catch(error){
        throw new Error(`Error updating product. Details: ${error}.`);
    }
}

async function updateProductCategory(id, newCategory){
    try{
        const result = await Product.modifyProductCategory(id, newCategory);
        return result;
    }catch(error){
        throw new Error(`Error updating product. Details: ${error}.`);
    }
}

async function replaceProduct(id, name, price, category){
    try{
        const result = await Product.changeProduct(id, name, price, category);
        return result;
    }catch(error){
        throw new Error(`Error replace product. Details: ${error}.`);
    }
}

module.exports = {
    insertProduct,
    deleteProduct,
    listProducts,
    findById,
    updateProductName,
    updateProductPrice,
    updateProductCategory,
    replaceProduct
};
