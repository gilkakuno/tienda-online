# Tienda Online - API REST con NestJS

API REST para gestionar una tienda online: clientes, productos, categorías y órdenes de compra.

**Stack:** NestJS 11 + TypeORM + PostgreSQL + Scalar API Docs

---

## Requisitos

- Node.js >= 18
- PostgreSQL corriendo localmente
- npm

## Configuración de Base de Datos

1. Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE tienda_online;
```

2. Credenciales por defecto (modificar en `src/app.module.ts` si es necesario):
   - Host: `localhost`
   - Puerto: `5432`
   - Usuario: `postgres`
   - Contraseña: `123456`
   - Base de datos: `tienda_online`

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## Documentación Scalar

Una vez corriendo el servidor, acceder a:

👉 **http://localhost:3000/api-docs**

## Endpoints disponibles

### Clientes — `/clientes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /clientes | Listar todos los clientes |
| GET | /clientes/:id | Obtener cliente por ID |
| POST | /clientes | Crear nuevo cliente |
| PATCH | /clientes/:id | Actualizar cliente |
| DELETE | /clientes/:id | Eliminar cliente |

### Categorías — `/categorias`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /categorias | Listar todas las categorías |
| GET | /categorias/:id | Obtener categoría con sus productos |
| POST | /categorias | Crear nueva categoría |
| PATCH | /categorias/:id | Actualizar categoría |
| DELETE | /categorias/:id | Eliminar categoría |

### Productos — `/productos`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /productos | Listar todos los productos con categoría |
| GET | /productos/:id | Obtener producto con su categoría |
| POST | /productos | Crear producto (requiere idCategoria) |
| PATCH | /productos/:id | Actualizar producto |
| DELETE | /productos/:id | Eliminar producto |

### Órdenes — `/ordenes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /ordenes | Listar todas las órdenes |
| GET | /ordenes/:id | Obtener orden con todos sus productos |
| POST | /ordenes | Crear orden (requiere idCliente) |
| PATCH | /ordenes/:id | Actualizar estado de la orden |
| DELETE | /ordenes/:id | Eliminar orden |

### Orden-Producto — `/orden_producto`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /orden_producto | Listar todos los registros |
| GET | /orden_producto/:id | Obtener registro con orden y producto |
| POST | /orden_producto | Agregar producto a una orden |
| PATCH | /orden_producto/:id | Actualizar cantidad o precio |
| DELETE | /orden_producto/:id/productos/:productId | Quitar producto de la orden |

## Ejemplos de uso

### Crear un cliente
```json
POST /clientes
{
  "nombres": "Juan Carlos",
  "paterno": "Mamani",
  "materno": "Quispe",
  "email": "juan@email.com"
}
```

### Crear una categoría
```json
POST /categorias
{
  "nombre": "Electrónica",
  "descripcion": "Productos electrónicos y tecnología"
}
```

### Crear un producto
```json
POST /productos
{
  "idCategoria": 1,
  "nombre": "Laptop HP",
  "descripcion": "Laptop HP 15 pulgadas, 8GB RAM",
  "precio": 1500.00,
  "stock": 10
}
```

### Crear una orden
```json
POST /ordenes
{
  "idCliente": 1,
  "estado": "pendiente"
}
```

### Agregar producto a orden
```json
POST /orden_producto
{
  "idOrden": 1,
  "idProducto": 1,
  "cantidad": 2,
  "precio_unitario": 1500.00
}
```
