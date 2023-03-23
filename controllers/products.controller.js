const Product = require("../models/Product.model");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("-name");
  res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject); // await result at the end of the query.

  /**
   * @description sort here await result at the end of the query.
   */
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const products = await result;

  // const products = await Product.find(queryObject);
  res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
