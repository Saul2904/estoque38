import express from 'express';
import { login } from './controllers/userController.mjs';
import { getBrands, registerBrand, getBrand, putBrand} from './controllers/brandController.mjs';
import { getTypes, registerType, getType, putType } from './controllers/typeController.mjs';
import { getProducts, registerProduct, getProduct, putProduct } from './controllers/productController.mjs';
import { getEquipments, registerEquipment, getEquipment, putEquipment, searchEquipment } from './controllers/equipmentController.mjs';
import { getMovements, registerMovement, getMovement, putMovement } from './controllers/movementController.mjs';
import verifyJWT from './middleware.mjs';

const router = express.Router();

//brand
router.get('/brands', verifyJWT, getBrands);
router.post('/brand',verifyJWT, registerBrand);
router.route('/brand/:id')
    .get(verifyJWT, getBrand)
    .put(verifyJWT,putBrand)

//type
router.get('/types', verifyJWT, getTypes);
router.post('/type',verifyJWT, registerType);
router.route('/type/:id')
    .get(verifyJWT, getType)
    .put(verifyJWT,putType)

//product
router.get('/products', verifyJWT, getProducts);
router.post('/product',verifyJWT, registerProduct);
router.route('/product/:id')
    .get(verifyJWT, getProduct)
    .put(verifyJWT, putProduct)

//equipament
router.get('/equipments', verifyJWT, getEquipments);
router.post('/equipment',verifyJWT, registerEquipment);
router.get('/equipment/patrimony/:patrimony',verifyJWT,searchEquipment);
router.get('/equipment/serial/:serial',verifyJWT,searchEquipment);
router.route('/equipment/:id')
    .get(verifyJWT, getEquipment)
    .put(verifyJWT, putEquipment)

//movement
router.get('/movements', verifyJWT, getMovements);
router.post('/movement',verifyJWT, registerMovement);
router.route('/movement/:id')
    .get(verifyJWT, getMovement)
    .put(verifyJWT, putMovement)

//user
router.post('/login', login);

export default router;