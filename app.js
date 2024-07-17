const express = require("express");
const app = express();
const router = express.Router();
const ProductController = require("./controllers/productController");
const serviceProduct = require("./services/productService");

const productController = new ProductController(serviceProduct);

app.use(express.json());

router.get("/list-products", (request, response) => productController.listProducts(request, response));
router.get("/product/:id", (request, response) => productController.findById(request, response));
router.post("/add-product", (request, response) => productController.insertProduct(request, response));
router.delete("/delete-product/:id", (request, response) => productController.deleteProduct(request, response));
router.patch("/modify-product/:id", (request, response) => productController.updateProduct(request, response));

app.use("/api-products", router);

app.listen(4002, () => console.log("Listen port 4002"));
