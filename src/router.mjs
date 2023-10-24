import express from 'express';
import { login } from './controllers/userController.mjs';
import { getBrands, registerBrand, getBrand, updateBrands} from './controllers/brandController.mjs';
import verifyJWT from './middleware.mjs';

const router = express.Router();

router.get('/brands', verifyJWT, getBrands);
router.post('/brand',verifyJWT, registerBrand);
router.get('/brand/:id',verifyJWT, getBrand);
router.put('/brand/:id',verifyJWT, updateBrands);
router.post('/login', login);

export default router;