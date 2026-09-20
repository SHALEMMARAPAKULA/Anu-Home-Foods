import express from 'express';
import { getProducts, getProductById, getBestsellers } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/bestsellers', getBestsellers);
router.get('/:id', getProductById);

export default router;
