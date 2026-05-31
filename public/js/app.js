const API_URL = '/api/adidas';

const formulario = document.getElementById('formProducto');
const contenedorProductos = document.getElementById('contenedorProductos');
const mensaje = document.getElementById('mensaje');
const productoId = document.getElementById('productoId');
const totalProductos = document.getElementById('totalProductos');
const textoBotonGuardar = document.getElementById('textoBotonGuardar');
const botonGuardar = document.querySelector('#formProducto button[type="submit"]');
const botonLimpiar = document.getElementById('btnLimpiar');
const botonRecargar = document.getElementById('btnRecargar');

document.addEventListener('DOMContentLoaded', obtenerProductos);
formulario.addEventListener('submit', guardarProducto);
botonLimpiar.addEventListener('click', limpiarFormulario);
botonRecargar.addEventListener('click', obtenerProductos);

contenedorProductos.addEventListener('click', (event) => {
  const botonEditar = event.target.closest('[data-accion="editar"]');
  const botonEliminar = event.target.closest('[data-accion="eliminar"]');

  if (botonEditar) {
    editarProducto(botonEditar.dataset.id);
  }

  if (botonEliminar) {
    eliminarProducto(botonEliminar.dataset.id);
  }
});

async function obtenerProductos() {
  try {
    contenedorProductos.innerHTML = '<div class="col-12"><div class="empty-state">Cargando productos...</div></div>';

    const respuesta = await fetch(API_URL);
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.message || 'No se pudo obtener el listado');
    }

    renderizarProductos(resultado.data || []);
  } catch (error) {
    contenedorProductos.innerHTML = '';
    mostrarMensaje(error.message, 'danger');
  }
}

async function guardarProducto(event) {
  event.preventDefault();

  const id = productoId.value;
  const producto = obtenerDatosFormulario();
  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    botonGuardar.disabled = true;
    textoBotonGuardar.textContent = id ? 'Actualizando...' : 'Guardando...';

    const respuesta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(obtenerMensajeError(resultado));
    }

    mostrarMensaje(resultado.message || 'Operacion realizada correctamente', 'success');
    limpiarFormulario();
    await obtenerProductos();
  } catch (error) {
    mostrarMensaje(error.message, 'danger');
  } finally {
    botonGuardar.disabled = false;
    textoBotonGuardar.textContent = productoId.value ? 'Actualizar producto' : 'Guardar producto';
  }
}

async function editarProducto(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.message || 'No se pudo cargar el producto');
    }

    llenarFormulario(resultado.data);
    mostrarMensaje('Producto cargado para editar', 'warning');
    formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    mostrarMensaje(error.message, 'danger');
  }
}

async function eliminarProducto(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.message || 'No se pudo eliminar el producto');
    }

    mostrarMensaje(resultado.message || 'Producto eliminado correctamente', 'success');
    await obtenerProductos();
  } catch (error) {
    mostrarMensaje(error.message, 'danger');
  }
}

function llenarFormulario(producto) {
  productoId.value = producto._id;
  document.getElementById('nombreProducto').value = producto.nombreProducto || '';
  document.getElementById('categoria').value = producto.categoria || '';
  document.getElementById('linea').value = producto.linea || '';
  document.getElementById('deporte').value = producto.deporte || '';
  document.getElementById('precio').value = producto.precio ?? '';
  document.getElementById('stock').value = producto.stock ?? '';
  document.getElementById('tallaDisponible').value = producto.tallaDisponible || '';
  document.getElementById('colorPrincipal').value = producto.colorPrincipal || '';
  document.getElementById('material').value = producto.material || '';
  document.getElementById('estado').value = producto.estado || 'Disponible';
  document.getElementById('descripcion').value = producto.descripcion || '';
  document.getElementById('imagenUrl').value = producto.imagenUrl || '';
  textoBotonGuardar.textContent = 'Actualizar producto';
}

function limpiarFormulario() {
  formulario.reset();
  productoId.value = '';
  document.getElementById('estado').value = 'Disponible';
  textoBotonGuardar.textContent = 'Guardar producto';
}

function mostrarMensaje(texto, tipo) {
  mensaje.className = `alert alert-${tipo}`;
  mensaje.textContent = texto;

  if (tipo !== 'danger') {
    setTimeout(() => {
      mensaje.className = 'alert d-none';
      mensaje.textContent = '';
    }, 3500);
  }
}

function obtenerDatosFormulario() {
  return {
    nombreProducto: document.getElementById('nombreProducto').value.trim(),
    categoria: document.getElementById('categoria').value.trim(),
    linea: document.getElementById('linea').value.trim(),
    deporte: document.getElementById('deporte').value.trim(),
    precio: Number(document.getElementById('precio').value),
    stock: Number(document.getElementById('stock').value),
    tallaDisponible: document.getElementById('tallaDisponible').value.trim(),
    colorPrincipal: document.getElementById('colorPrincipal').value.trim(),
    material: document.getElementById('material').value.trim(),
    estado: document.getElementById('estado').value,
    descripcion: document.getElementById('descripcion').value.trim(),
    imagenUrl: document.getElementById('imagenUrl').value.trim()
  };
}

function renderizarProductos(productos) {
  contenedorProductos.innerHTML = '';
  totalProductos.textContent = productos.length;

  if (productos.length === 0) {
    const estadoVacio = document.createElement('div');
    estadoVacio.className = 'col-12';
    estadoVacio.innerHTML = '<div class="empty-state">No hay productos registrados.</div>';
    contenedorProductos.appendChild(estadoVacio);
    return;
  }

  productos.forEach((producto) => {
    const columna = document.createElement('div');
    columna.className = 'col';

    const imagen = producto.imagenUrl
      ? `<img class="product-image" src="${escaparHtml(producto.imagenUrl)}" alt="${escaparHtml(producto.nombreProducto)}">`
      : '<div class="product-placeholder">Sin imagen</div>';

    columna.innerHTML = `
      <article class="card product-card shadow-sm">
        ${imagen}
        <div class="card-body d-flex flex-column gap-3">
          <div>
            <div class="d-flex align-items-start justify-content-between gap-2 mb-2">
              <h3 class="h5 fw-bold mb-0">${escaparHtml(producto.nombreProducto)}</h3>
              <span class="badge ${obtenerClaseEstado(producto.estado)}">${escaparHtml(producto.estado)}</span>
            </div>
            <p class="descripcion-producto mb-0">${escaparHtml(producto.descripcion)}</p>
          </div>

          <div class="product-meta">
            <span><strong>Categoria</strong>${escaparHtml(producto.categoria)}</span>
            <span><strong>Linea</strong>${escaparHtml(producto.linea)}</span>
            <span><strong>Deporte</strong>${escaparHtml(producto.deporte)}</span>
            <span><strong>Precio</strong>$${Number(producto.precio).toFixed(2)}</span>
            <span><strong>Stock</strong>${producto.stock}</span>
            <span><strong>Talla</strong>${escaparHtml(producto.tallaDisponible)}</span>
            <span><strong>Color</strong>${escaparHtml(producto.colorPrincipal)}</span>
            <span><strong>Material</strong>${escaparHtml(producto.material)}</span>
          </div>

          <div class="d-flex gap-2 mt-auto">
            <button type="button" class="btn btn-warning flex-fill" data-accion="editar" data-id="${producto._id}">
              Editar
            </button>
            <button type="button" class="btn btn-danger flex-fill" data-accion="eliminar" data-id="${producto._id}">
              Eliminar
            </button>
          </div>
        </div>
      </article>
    `;

    contenedorProductos.appendChild(columna);
  });
}

function obtenerMensajeError(resultado) {
  if (Array.isArray(resultado.errors)) {
    return resultado.errors.join(' | ');
  }

  return resultado.message || 'Error en la solicitud';
}

function obtenerClaseEstado(estado) {
  if (estado === 'Agotado') {
    return 'text-bg-danger';
  }

  if (estado === 'Edicion limitada') {
    return 'text-bg-warning';
  }

  return 'text-bg-success';
}

function escaparHtml(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
