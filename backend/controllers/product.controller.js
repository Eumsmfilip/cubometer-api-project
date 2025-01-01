const { where, Sequelize } = require("sequelize");
const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        active: true,
      },
    });
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Method get product by ID { Only for DEV purposes }
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductByGtin = async (req, res) => {
  try {
    const { gtin13 } = req.params;
    const product = await Product.findAll({
      where: {
        gtin13: gtin13,
      },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { gtin13, name } = req.body;

    const [uniqueGtin, uniqueName] = await Promise.all([
      Product.findOne({
        where: {
          gtin13: gtin13,
        },
      }),
      Product.findOne({
        where: {
          name: name,
        },
      }),
    ]);

    if (!uniqueGtin && !uniqueName) {
      const product = await Product.create(req.body);
      return res
        .status(201)
        .json({ message: "Product created successfully!", product });
    } else if (uniqueGtin && uniqueName) {
      const productRegistered = await Product.findOne({
        where: {
          gtin13: gtin13,
        },
      });
      return res.status(400).json({
        message: `Both GTIN: ${gtin13}, and name: ${name}, are already registered in the product: ${productRegistered.name}.`,
      });
    } else if (uniqueGtin) {
      const productRegistered = await Product.findOne({
        where: {
          gtin13: gtin13,
        },
      });
      return res.status(400).json({
        message: `The GTIN: ${gtin13}, is already registered in the product: ${productRegistered.name}.`,
      });
    } else {
      const productRegistered = await Product.findOne({
        where: {
          name: name,
        },
      });
      return res.status(400).json({
        message: `The name: ${name}, is already registered in the product: ${productRegistered.name}.`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { gtin13 } = req.params;
    const product = await Product.findOne({
      where: { gtin13 },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const { name, gtin13: newGtin13 } = req.body;

    const uniqueGtinPromise =
      newGtin13 && newGtin13 !== gtin13
        ? Product.findOne({
            where: { gtin13: newGtin13, id: { [Sequelize.Op.ne]: product.id } },
          })
        : null;

    const uniqueNamePromise =
      name && name !== product.name
        ? Product.findOne({
            where: { name, id: { [Sequelize.Op.ne]: product.id } },
          })
        : null;

    const [uniqueGtin, uniqueName] = await Promise.all([
      uniqueGtinPromise,
      uniqueNamePromise,
    ]);

    if (uniqueGtin && uniqueName) {
      const productRegistered = await Product.findOne({
        where: {
          gtin13: gtin13,
        },
      });
      return res.status(400).json({
        message: `Both GTIN: ${gtin13}, and name: ${name}, are already registered in the product: ${productRegistered.name}.`,
      });
    } else if (uniqueGtin) {
      const productRegistered = await Product.findOne({
        where: {
          gtin13: gtin13,
        },
      });
      return res.status(400).json({
        message: `The GTIN: ${newGtin13}, is already registered in the product: ${productRegistered.name}.`,
      });
    } else if (uniqueName) {
      const productRegistered = await Product.findOne({
        where: {
          gtin13: gtin13,
        },
      });
      return res.status(400).json({
        message: `The name: ${name}, is already registered in the product: ${productRegistered.name}.`,
      });
    }

    const updatedProduct = await product.update(req.body);
    return res.status(200).json({ updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProductDimensions = async (req, res) => {
  try {
    const { gtin13 } = req.params;
    const { length, width, height } = req.body;

    const product = await Product.findOne({
      where: {
        gtin13: gtin13,
      },
    });
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
      return res
        .status(200)
        .json({ message: "Product's dimension saved successfully." });
    }

    if (currentVolume !== newVolume) {
      product.length = length;
      product.width = width;
      product.height = height;

      await product.save();
      return res.status(200).json({
        message: `Product's dimensions updated from: ${productBeforeUpdate.length}x${productBeforeUpdate.width}x${productBeforeUpdate.height}cm To: ${product.length}x${product.width}x${product.height}cm`,
      });
    } else {
      return res.status(400).json({ message: "The volume has not changed." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Method to delete a product from Database { Only for DEV purposes }.
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    await product.destroy();
    return res.status(200).json({ message: "Product deleted." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const inactivateProduct = async (req, res) => {
  try {
    const { gtin13 } = req.params;
    const product = await Product.findOne({
      where: {
        gtin13: gtin13,
      },
    });
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
    return res.status(200).json({ message: "Product inactivated." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByGtin,
  createProduct,
  updateProduct,
  updateProductDimensions,
  inactivateProduct,
  deleteProduct,
};
