import { Router } from 'express';
import adidasRoutes from './adidas.routes.js';

const indexRoutes = Router();

indexRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Adidas Backend funcionando correctamente',
    endpoints: {
      adidas: '/api/adidas'
    }
  });
});

indexRoutes.use('/adidas', adidasRoutes);

export default indexRoutes;
