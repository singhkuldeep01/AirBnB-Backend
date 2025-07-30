import express, { Request, Response } from 'express';
import { errorHandler } from './middleware/error.middleware';
import { attachUniqueID } from './middleware/attachUniqueID.middleware';
import hotelRoutes from './routes/hotel.route';
import pingRouter from './routes/ping.route';

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(attachUniqueID);

// Health check
app.use('/ping', pingRouter);

// Routes
app.use('/api', hotelRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

// Error handler
app.use(errorHandler);

export default app;
