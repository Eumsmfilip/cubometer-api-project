const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductDimensions,
  inactivateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.put("/dimensions/:id", updateProductDimensions);

router.put("/:id", inactivateProduct);

router.delete("/dev/:id", deleteProduct);

module.exports = router;
