// services/productService.js
const UsersModel = require("../models/product.model");

const getProducts = async ({ page, limit, flag, category, search }) => {
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  const n = (page - 1) * limit || 0;
  const query = UsersModel.find(filter).skip(n).limit(parseInt(limit));
  if (flag) query.sort({ price: parseInt(flag) });

  const data = await query.exec();
  const count = await UsersModel.countDocuments(filter);

  return { count, data };
};

const getProductById = async (id) => {
  return await UsersModel.findById(id);
};

const createProduct = async (productData, file) => {
  const { name, tag, category, amount, price, desc } = productData;
  if (!name || !tag || !category || !amount || !price || !desc) {
    throw Object.assign(new Error(), {
      name: "BAD_REQUEST",
      message: "please fill all the required fields",
    });
  }
  return await UsersModel.create({
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
  return await UsersModel.findByIdAndUpdate(id, { 
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
  return await UsersModel.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
