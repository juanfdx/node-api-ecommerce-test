import { StatusCodes } from 'http-status-codes';
import Product from '../models/product.model.js';



/*===========================================================
  GET ALL PRODUCTS
============================================================*/
export const getProducts = async (req, res) => {

  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products });

};



/*===========================================================
  GET PRODUCT BY SLUG
============================================================*/
export const getProductBySlug = async (req, res) => {

  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Product not found' });
  }

  res.status(StatusCodes.OK).json({ product });

}


/*===========================================================
  GET PRODUCT BY VARIATION
============================================================*/
export const getProductByVariation = async (req, res) => {

  const { slug, variationId } = req.params;

  const product = await Product.findOne({ slug });

  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Product not found' });
  }

  const variation = product.variations.find((v) => v._id.toString() === variationId);

  if (!variation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Variation not found' });
  }

  res.status(StatusCodes.OK).json({ variation });

}
