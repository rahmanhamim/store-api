const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ success: true, msg: "show all products" });
};
