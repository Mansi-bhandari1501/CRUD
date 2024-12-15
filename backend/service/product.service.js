const ProductModel = require("../models/product.model");

const getProducts = async ({ page, limit, flag, category, search }) => {
  const filter = {};
  if (search) filter.name = { $regex: search, $options: "i" };

  const offset = (page - 1) * limit || 0;
  const query = ProductModel.find(filter).skip(offset).limit(parseInt(limit));
  const data = await query.exec();
  const count = await ProductModel.countDocuments(filter);

  return { count, data };
};

const getProductById = async (id) => {
  return await ProductModel.findById(id);
};

const createProduct = async (productData, file) => {
  const { name, tag, category, amount, price, desc } = productData;
  if (!name || !tag || !category || !amount || !price || !desc) {
    throw Object.assign(new Error(), {
      name: "BAD_REQUEST",
      message: "please fill all the required fields",
    });
  }
  return await ProductModel.create({
    name,
    tag,
    category,
    amount,
    price,
    desc,
    image: file && file.path
  });
};

const updateProduct = async (id, updatedData,file) => {
  const { name, tag, category, amount, price, desc } = updatedData;
  return await ProductModel.findByIdAndUpdate(id, { 
    name,
    tag,
    category,
    amount,
    price,
    desc,
    image: file && file.path
  }, { new: true });
};

const deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
