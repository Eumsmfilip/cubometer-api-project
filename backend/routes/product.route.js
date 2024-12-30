const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  getProductByGtin,
  createProduct,
  updateProduct,
  updateProductDimensions,
  inactivateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);

router.get("/dev/:id", getProductById);

router.get("/:gtin13", getProductByGtin);

router.post("/", createProduct);

router.put("/update/:gtin13", updateProduct);

router.put("/dimensions/:gtin13", updateProductDimensions);

router.put("/inactivate/:gtin13", inactivateProduct);

router.delete("/dev/:id", deleteProduct);

module.exports = router;
