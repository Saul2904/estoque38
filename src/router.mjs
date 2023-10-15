import express from 'express';
import { login } from './controllers/userController.mjs';
import { getAllBrands, registerBrand } from './controllers/brandController.mjs';
import verifyJWT from './middleware.mjs';

const router = express.Router();
router.get('/getAllBrands', verifyJWT, getAllBrands);
router.post('/cadBrand', verifyJWT, registerBrand);
router.post('/login', login);

export default router;