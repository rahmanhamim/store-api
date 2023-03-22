const getAllProductsStatic = async (req, res) => {
  /**
   * @description throw an error to test error handling middleware package: express-async-errors
   */
  throw new Error("testing async error handling");
  res.status(200).json({ success: true, msg: "show all products static" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, msg: "products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
