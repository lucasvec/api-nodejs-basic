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
            return response.json({error: 'Product not found.'});
        }else{
            return response.json(product);
        }
    }

    async updateProduct(request, response){
        const {id} = request.params;
        let {name, price, category} = request.body;

        let invalidFormat = false;
        
        if(name != null){
            name = name.trim();
            if(name.length > 0 && name.length < 51){
                await this.serviceProduct.updateProductName(id, name);
            }else{
                invalidFormat = true;
            }
        }

        if(price != null){
            if(price > 0){
                await this.serviceProduct.updateProductPrice(id, price);
            }else{
                invalidFormat = true;
            }
        }
            
        if(category != null){
            category = category.trim();
            if(category.length > 1 && category.length < 31){
                await this.serviceProduct.updateProductCategory(id, category);
            }else{
                invalidFormat = true;
            }
        }

        const product = await this.serviceProduct.findById(id);

        if(!product.length > 0){
            return response.json({ error: 'Product not found.'});
        }

        if(invalidFormat){
            return response.json({error: "invalid size."});
        }

        return response.json(product);
    }

    async insertProduct(request, response) {
        let { name, price, category } = request.body;

        if(name != null && price != null && category != null){
            name = name.trim();
            category = category.trim();

            if(name.length > 0 && price > 0 && category.length > 1 && name.length < 51 && category.length < 31){
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
            }else{
                response.json({error: "Invalid size."});
            }
        }else{
            response.json({error: "Incomplete data."});
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
            return response.json({error: "Product not found."});
        }
        }

    async replaceProduct(request, response){
        const { id } = request.params;
        let { name, price, category } = request.body;

        if(name != null && price != null && category != null){
            if(name.length > 0 && price > 0 && category.length > 1 && name.length < 51 && category.length < 31){
                name = name.trim();
                category = category.trim();

                await this.serviceProduct.replaceProduct(id, name, price, category);
                const product = await this.serviceProduct.findById(id);
                if(product.length > 0){
                    return response.json(product);
                }else{
                    return response.json({error: "Product not found."});
                }
            }else{
                return response.json({error: "Invalid size."});
            }
        }else{
            return response.json({error: "Incomplete data."});
        }

    }


    }
    

module.exports = ProductController;
