import express from 'express';
import { verifyToken } from '../middleware/jwtAuth';
import upload from '../config/multer.config';
import imageUploader from '../middleware/imageUploader';
import { validatePostCar, validatePatchStatus } from '../middleware/vaidators/car';
import { postCarAd, updateStatus } from '../controllers/car';


const router = express.Router();

router.post('/car',
    verifyToken,
    upload.array('displayImage', 12),
    verifyToken,
    validatePostCar,
    imageUploader,
    postCarAd);

router.patch('/car/:carId/status', verifyToken, validatePatchStatus, updateStatus);


export default router;