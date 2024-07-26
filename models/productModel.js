const db = require("../config/db.config");
const {randomUUID} = require("crypto");

class Product {
    constructor(name, price, category){
        this.id = randomUUID();
        this.name = name;
        this.price = price;
        this.category = category;
    }

    static async getProducts(){
        const query = await db.query("SELECT * FROM product");
        return query[0];
    }

    static async getProductById(id){
        const query = await db.query("SELECT * FROM product WHERE product.id = ?", id);
        return query[0];
    }

    static async modifyProductName(id, name){
        const query = await db.query("UPDATE product SET product.name = ? WHERE product.id = ?", [name, id]);
        return query;
    }
    static async modifyProductPrice(id, price){
        const query = await db.query("UPDATE product SET product.price = ? WHERE product.id = ?", [price, id]);
        return query;
    }

    static async modifyProductCategory(id, category){
        const query = await db.query("UPDATE product SET product.category = ? WHERE product.id = ?", [category, id]);
        return query;
    }

    static async addProduct(id, name, price, category){
        const query = await db.query("INSERT INTO product (id, name, price, category) values (?, ?, ?, ?)", [id, name, price, category]);
        return query;
    }

    static async removeProduct(id){
        const query = await db.query("DELETE FROM product WHERE id = ?", [id]);
        return query;
    }

    static async changeProduct(id, name, price, category){
        const query = await db.query("UPDATE product SET product.name = ?, product.price = ?, product.category = ? WHERE product.id = ?", [name, price, category, id]);
        return query;
    }


}

module.exports = Product;