import mongoose from 'mongoose';

const adidasSchema = new mongoose.Schema(
  {
    nombreProducto: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true
    },
    categoria: {
      type: String,
      required: [true, 'La categoria es obligatoria'],
      trim: true
    },
    linea: {
      type: String,
      required: [true, 'La linea del producto es obligatoria'],
      trim: true
    },
    deporte: {
      type: String,
      required: [true, 'El deporte o uso principal es obligatorio'],
      trim: true
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo']
    },
    tallaDisponible: {
      type: String,
      required: [true, 'La talla disponible es obligatoria'],
      trim: true
    },
    colorPrincipal: {
      type: String,
      required: [true, 'El color principal es obligatorio'],
      trim: true
    },
    material: {
      type: String,
      required: [true, 'El material es obligatorio'],
      trim: true
    },
    estado: {
      type: String,
      enum: ['Disponible', 'Agotado', 'Edicion limitada'],
      default: 'Disponible'
    },
    descripcion: {
      type: String,
      required: [true, 'La descripcion es obligatoria'],
      trim: true
    },
    imagenUrl: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const AdidasProducto = mongoose.model('AdidasProducto', adidasSchema);

export default AdidasProducto;
