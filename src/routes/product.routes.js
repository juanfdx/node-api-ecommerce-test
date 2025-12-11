import express from 'express';
const router  = express.Router();

// CONTROLLERS
import { getProductBySlug, getProductByVariation, getProducts } from '../controllers/product.controller.js';



//ROUTES
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.get('/:slug/:variationId', getProductByVariation);





export default router;