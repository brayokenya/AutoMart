import express from 'express';
import { verifyToken } from '../middleware/jwtAuth';
import upload from '../config/multer.config';
import imageUploader from '../middleware/imageUploader';
import {
    validatePostCar,
    validatePatchStatus,
    validatePatchPrice,
    validateGetCar,
    validateDeleteCar
} from '../middleware/vaidators/car';
import {
    postCarAd,
    updateStatus,
    updatePrice,
    getSpecificCar,
    deleteAd,
    getCar
} from '../controllers/car';


const router = express.Router();

router.post('/car',
    verifyToken,
    upload.array('displayImage', 12),
    verifyToken,
    validatePostCar,
    imageUploader,
    postCarAd);

router.get('/car', getCar);
router.patch('/car/:carId/status', verifyToken, validatePatchStatus, updateStatus);
router.patch('/car/:carId/price', verifyToken, validatePatchPrice, updatePrice);
router.get('/car/:carId', validateGetCar, getSpecificCar);
router.delete('/car/:carId', verifyToken, validateDeleteCar, deleteAd);

export default router;
