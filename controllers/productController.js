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

    insertProduct(request, response) {
        const { name, price, category } = request.body;

        const products = this.serviceProduct.listProducts()
        const existsProduct = products.find(product => product.name.toLowerCase().trim()  === name.toLowerCase().trim());

        if (existsProduct){
            return response.json({message: "Error. Product already exists."});
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
                return response.json({message: "Error. Product not inserted."});
            }
        }

        
    }

    deleteProduct(request, response) {
        const { id } = request.params;
        const result = this.serviceProduct.deleteProduct(id);
        if (result != null ) {
            return response.json(result[0]);
        } else {
            return response.json({ error: 'Product not found' });
        }
    }
}

module.exports = ProductController;
