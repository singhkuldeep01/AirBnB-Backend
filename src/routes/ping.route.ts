
import express from 'express';
import { pingController } from '../controllers/ping.controller';
const pingRouter = express.Router();


pingRouter.get('/ping', pingController);

export default pingRouter;