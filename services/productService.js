const { randomUUID } = require("crypto");

let products = [
    {
        id: randomUUID(),
        name: "Picanha Swift Pro",
        price: 54.4,
        category: "Master"
    }
];

function insertProduct(product) {
    products.push(product);
    return product;
}

function listProducts() {
    return products;
}

function findById(id){
    return products.find((product) => product.id === id);
}

function deleteProduct(id) {
    const index = products.findIndex((product) => product.id === id);
    
    if (index !== -1) {
        const product = products.splice(index, 1);
        return product;
    }
}

module.exports = {
    insertProduct,
    deleteProduct,
    listProducts,
    findById
};
