const { where } = require("sequelize");
const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        active: true,
      },
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    const updatedProduct = await product.update(req.body);
    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductDimensions = async (req, res) => {
  try {
    const { id } = req.params;
    const { length, width, height } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const currentVolume = product.length * product.width * product.height;
    const newVolume = length * width * height;

    const productBeforeUpdate = {
      length: product.length,
      width: product.width,
      height: product.height,
    };

    if (currentVolume == null || newVolume == null) {
      product.length = length;
      product.width = width;
      product.height = height;

      product.save();
      res
        .status(200)
        .json({ message: "Product's dimension saved successfully." });
    }

    if (currentVolume !== newVolume) {
      product.length = length;
      product.width = width;
      product.height = height;

      await product.save();
      res.status(200).json({
        message: `Product's dimensions updated from: 
        Length: ${productBeforeUpdate.length}
        Width: ${productBeforeUpdate.width}
        Height: ${productBeforeUpdate.height}
        To: 
        Length: ${product.length}
        Width: ${product.width}
        Height: ${product.height}`,
      });
    } else {
      return res.status(400).json({ message: "The volume has not changed." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Method to delete a product from Database.
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const inactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (!product.active) {
      return res
        .status(403)
        .json({ message: "Product is not active and cannot be deleted." });
    }
    product.active = false;
    await product.save();
    res.status(200).json({ message: "Product inactivated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductDimensions,
  inactivateProduct,
  deleteProduct,
};
