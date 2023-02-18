import express from 'express';
import { geoController } from '../controllers/geo.controller';

const router = express.Router();
router.use('/geo', geoController);

export { router };