const Product = require("../models/Product.model");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    featured: true,
  }).sort("name");
  res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, msg: "products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
