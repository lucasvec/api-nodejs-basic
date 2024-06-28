const { randomUUID } = require("crypto");
const serviceProduct = require("../services/productService");

class ProductController {
    constructor(serviceProduct) {
        this.serviceProduct = serviceProduct;
    }

    listProducts(request, response) {
        return response.json(this.serviceProduct.listProducts());
    }

    findById(request, response){
        const {id} = request.params;
        return response.json(this.serviceProduct.findById(id));
    }

    updateProduct(request, response){
        const {id} = request.params;
        const {name, price, category} = request.body;

        const findProduct = this.serviceProduct.findById(id);

        if(findProduct != null){
            if(name != null){
                product = {
                    name: name
                }
                return product
            }else{
                if(price != null){
                    product = {
                        price: price
                    }
                    return product
                }
                else{
                    if(category != null){
                        product = {
                            category: category
                        }
                        return product
                    }
                }
            }
        }


    }

    insertProduct(request, response) {
        const { name, price, category } = request.body;

        const products = this.serviceProduct.listProducts()
        const existsProduct = products.find(product => product.name.toLowerCase().trim()  === name.toLowerCase().trim());

        if (existsProduct){
            return response.json({  error: "Product already exists."});
        }else{

            const product = {
                id: randomUUID(),
                name: name,
                price: price,
                category: category
            };

            const result = this.serviceProduct.insertProduct(product);

            if (result){
                return response.json(product);
            }else{
                return response.json({ error: "Product not inserted."});
            }
        }

        
    }

    deleteProduct(request, response) {
        const { id } = request.params;
        const result = this.serviceProduct.deleteProduct(id);
        if (result != null ) {
            return response.json(result[0]);
        } else {
            return response.json({ error: 'Product not found'});
        }
    }


}

module.exports = ProductController;
