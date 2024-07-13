import Product from '../models/product';
import meta from '../utils/metaResponse';
import extractToken from '../utils/extractToken';

export const getAllProductsHandler = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(meta(200, 'Products fetched successfully', products));
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to fetch products', undefined, error.message));
  }
};

export const getProductByIdHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(meta(200, 'Product fetched successfully', product));
    } else {
      res.status(404).json(meta(404, 'Product not found'));
    }
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to fetch product', undefined, error.message));
  }
};

export const createProductHandler = async (req, res) => {
  const { name, description, price } = req.body;
  const creatorName = extractToken(req);

  try {
    const product = await Product.create({ name, description, price, creatorName });
    res.status(201).json(meta(201, 'Product created successfully', product));
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to create product', undefined, error.message));
  }
};

export const updateProductHandler = async (req, res) => {
  const { id } = req.query;
  const { name, description, price } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
    if (product) {
      res.status(200).json(meta(200, 'Product updated successfully', product));
    } else {
      res.status(404).json(meta(404, 'Product not found'));
    }
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to update product', undefined, error.message));
  }
};

export const deleteProductHandler = async (req, res) => {
  const { id } = req.query;
  try {
    await Product.findByIdAndDelete(id);
    res.status(202).json(meta(202, 'Product deleted successfully'));
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to delete product', undefined, error.message));
  }
};
