const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ success: true, msg: "show all products static" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, msg: "products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
