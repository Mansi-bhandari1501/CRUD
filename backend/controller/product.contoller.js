const ProductService = require('../service/product.service');

const getProducts = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const products = await ProductService.getProducts({ page, limit, search });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await ProductService.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const file = req.file;
        const product = await ProductService.createProduct(productData,file);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const file = req.file;
        const updatedProduct = await ProductService.updateProduct(id, updatedData,file);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        res.status(200).json("Deleted");
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
