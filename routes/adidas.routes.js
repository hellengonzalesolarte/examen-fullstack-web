import { Router } from 'express';
import {
  crearProductoAdidas,
  obtenerProductosAdidas,
  obtenerProductoAdidasPorId,
  actualizarProductoAdidas,
  eliminarProductoAdidas
} from '../controllers/adidas.controllers.js';

const router = Router();

router.post('/', crearProductoAdidas);
router.get('/', obtenerProductosAdidas);
router.get('/:id', obtenerProductoAdidasPorId);
router.put('/:id', actualizarProductoAdidas);
router.delete('/:id', eliminarProductoAdidas);

export default router;
