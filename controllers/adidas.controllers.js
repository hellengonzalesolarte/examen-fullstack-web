import mongoose from 'mongoose';
import AdidasProducto from '../models/adidas.model.js';

const obtenerProductosAdidas = async (req, res) => {
  try {
    const productos = await AdidasProducto.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los productos Adidas'
    });
  }
};

const obtenerProductoAdidasPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido'
      });
    }

    const producto = await AdidasProducto.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto Adidas no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: producto
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el producto Adidas'
    });
  }
};

const crearProductoAdidas = async (req, res) => {
  try {
    const nuevoProducto = new AdidasProducto(req.body);
    const productoGuardado = await nuevoProducto.save();

    return res.status(201).json({
      success: true,
      message: 'Producto Adidas creado correctamente',
      data: productoGuardado
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validacion',
        errors: Object.values(error.errors).map((err) => err.message)
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al crear el producto Adidas'
    });
  }
};

const actualizarProductoAdidas = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido'
      });
    }

    const productoActualizado = await AdidasProducto.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Producto Adidas no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto Adidas actualizado correctamente',
      data: productoActualizado
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validacion',
        errors: Object.values(error.errors).map((err) => err.message)
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el producto Adidas'
    });
  }
};

const eliminarProductoAdidas = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalido'
      });
    }

    const productoEliminado = await AdidasProducto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        message: 'Producto Adidas no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto Adidas eliminado correctamente',
      data: productoEliminado
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el producto Adidas'
    });
  }
};

export {
  crearProductoAdidas,
  obtenerProductosAdidas,
  obtenerProductoAdidasPorId,
  actualizarProductoAdidas,
  eliminarProductoAdidas
};
