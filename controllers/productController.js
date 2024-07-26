const classProduct = require("../models/productModel");
const serviceProduct = require("../services/productService");


class ProductController {
    constructor(serviceProduct) {
        this.serviceProduct = serviceProduct;
    }

    async listProducts(request, response) {
        return response.json(await this.serviceProduct.listProducts());
    }

    async findById(request, response){
        const {id} = request.params;
        const product = await this.serviceProduct.findById(id);
        if (!product.length > 0){
            return response.json({error: 'Product not found'});
        }else{
            return response.json(product);
        }
    }

    async updateProduct(request, response){
        const {id} = request.params;
        const {name, price, category} = request.body;
        
        if(name != null){
            await this.serviceProduct.updateProductName(id, name);
        }

        if(price != null){
            await this.serviceProduct.updateProductPrice(id, price);
        }
            
        if(category != null){
            await this.serviceProduct.updateProductCategory(id, category);
        }

        const product = await this.serviceProduct.findById(id);

        if(!product.length > 0){
            return response.json({ error: 'Product not found'});
        }

        return response.json(product);
    }

    async insertProduct(request, response) {
        const { name, price, category } = request.body;

        const products = await this.serviceProduct.listProducts();
        const existsProduct = products.find(product => product.name.toLowerCase().trim() === name.toLowerCase().trim());

        if (existsProduct){
            return response.json({error: "Product already exists."});
        }else{

            const product = new classProduct(name, price, category);     

            const result = this.serviceProduct.insertProduct(product);

            if (result){
                return response.json(product);
            }else{
                return response.json({error: "Product not inserted."});
            }
        }

        
    }

    async deleteProduct(request, response) {
        const { id } = request.params;
        
        const find = await this.serviceProduct.findById(id);

        if(find.length > 0){
            const product = find[0];
            await this.serviceProduct.deleteProduct(product);
            return response.json(product);
        }else{
            return response.json({error: "Product not found"});
        }
        }

    async replaceProduct(request, response){
        const { id } = request.params;
        const { name, price, category } = request.body;

        if(name != null && price != null && category != null){
            await this.serviceProduct.replaceProduct(id, name, price, category);
            const product = await this.serviceProduct.findById(id);
            if(product.length > 0){
                return response.json(product);
            }else{
                return response.json({error: "Product not found."});
            }
        }else{
            return response.json({error: "Incomplete data."});
        }

    }


    }
    

module.exports = ProductController;
