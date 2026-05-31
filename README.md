# Adidas API Route CRUD

Proyecto academico para gestionar un catalogo de productos deportivos Adidas con backend REST, base de datos MongoDB y frontend publico servido por Express.

## Tecnologias usadas

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Dotenv
- HTML, CSS y JavaScript
- Bootstrap 5.3.3 por CDN

## Estructura del proyecto

```txt
adidas-apiroute/
|-- config/
|   `-- database.js
|-- controllers/
|   `-- adidas.controllers.js
|-- models/
|   `-- adidas.model.js
|-- routes/
|   |-- adidas.routes.js
|   `-- index.routes.js
|-- public/
|   |-- index.html
|   |-- css/
|   |   `-- styles.css
|   `-- js/
|       `-- app.js
|-- .env
|-- app.js
|-- server.js
|-- package.json
|-- package-lock.json
`-- README.md
```

## Instalacion

```bash
npm install
```

El archivo `.env` debe existir y contener las variables `MONGO_URI` y `PORT`. No se debe publicar la URI real de MongoDB.

## Ejecucion

```bash
npm start
```

Frontend:

```txt
http://localhost:3000
```

API:

```txt
http://localhost:3000/api/adidas
```

Salud del servidor:

```txt
http://localhost:3000/health
```

## Rutas de la API

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/adidas` | Lista todos los productos |
| GET | `/api/adidas/:id` | Obtiene un producto por ID |
| POST | `/api/adidas` | Crea un producto |
| PUT | `/api/adidas/:id` | Actualiza un producto por ID |
| DELETE | `/api/adidas/:id` | Elimina un producto por ID |

## Modelo de producto

Campos principales:

- `nombreProducto`
- `categoria`
- `linea`
- `deporte`
- `precio`
- `stock`
- `tallaDisponible`
- `colorPrincipal`
- `material`
- `estado`
- `descripcion`
- `imagenUrl`

El campo `estado` acepta: `Disponible`, `Agotado` y `Edicion limitada`.

## Frontend

El frontend se encuentra dentro de la carpeta `public`. Usa Bootstrap para el diseno responsive y JavaScript con `async/await` y `fetch` para consumir la API real.

Funciones disponibles desde la interfaz:

- Listar productos desde MongoDB.
- Crear productos.
- Cargar un producto en el formulario para editarlo.
- Actualizar productos con PUT.
- Eliminar productos con DELETE.
- Mostrar mensajes visuales de exito o error.
- Refrescar el DOM sin recargar manualmente la pagina.

## Datos de prueba principales

El proyecto se entrega con 2 registros principales solicitados por la rubrica:

1. Adidas Ultraboost Light
2. Adidas Predator Accuracy

Tambien se prueba un registro temporal llamado `Producto Temporal Adidas`, creado solo para verificar DELETE y eliminado despues de la prueba.

## Autor o nota academica

Proyecto preparado para evaluacion academica de CRUD con Node.js, Express, MongoDB y frontend publico en Bootstrap.
