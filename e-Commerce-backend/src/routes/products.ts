import  express  from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// /api/v1/products/new
app.post("/new" ,adminOnly,singleUpload, newProduct);

// /api/v1/products/latest
app.get("/latest" ,getLatestProducts);

// /api/v1/products/all To get all products with filters 
app.get("/all" ,getAllProducts);


// /api/v1/products/categories
app.get("/categories" ,getAllCategories);

// /api/v1/products/adimin-products
app.get("/admin-product" ,adminOnly,getAdminProducts);

//To get, update, and delete a product
app.route("/:id").
    get(getSingleProduct).
    put(adminOnly,singleUpload,updateProduct).
    delete(adminOnly,deleteProduct);

export default app;
