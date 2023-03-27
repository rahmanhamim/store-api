const Product = require("../models/Product.model");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("-name");
  res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    // prettier-ignore
    let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
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

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  const total = await Product.countDocuments();
  const totalPages = Math.ceil(total / limit);
  // const products = await Product.find(queryObject);
  res.status(200).json({
    success: true,
    nbHits: products.length,
    total,
    totalPages,
    currentPage: page,
    limit: limit,
    data: products,
  });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
