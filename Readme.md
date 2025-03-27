# TCIT API de Posts - Documentación

## Descripción General
API REST desarrollada con Node.js, Express y TypeORM para la gestión de posts. Permite crear, listar y eliminar posts almacenados en una base de datos PostgreSQL.

## Configuración Técnica

### Base de Datos
- Sistema: PostgreSQL
- Host: localhost
- Puerto: 5432
- Usuario: postgres
- Base de datos: posts_db


## Endpoints

### Obtener Posts
- **URL**: `/posts`
- **Método**: GET
- **Respuesta Exitosa**:
```json
[
  {
    "id": 1,
    "name": "Ejemplo Post",
    "description": "Descripción del post"
  }
]
```

### Crear Post
- **URL**: `/posts`
- **Método**: POST
- **Body**:
```json
{
  "name": "Nombre del Post",
  "description": "Descripción del post"
}
```
- **Respuesta Exitosa** (201):
```json
{
  "id": 1,
  "name": "Nombre del Post",
  "description": "Descripción del post"
}
```

### Eliminar Post
- **URL**: `/posts/:id`
- **Método**: DELETE
- **Respuesta Exitosa**:
```json
{
  "id": 1,
  "name": "Nombre del Post",
  "description": "Descripción del post"
}
```

## Códigos de Error
- 404: Post no encontrado
- 500: Error interno del servidor

## Tecnologías Utilizadas
- Express.js - Framework web
- TypeORM - ORM para base de datos
- PostgreSQL - Base de datos
- cors - Middleware para CORS
- dotenv - Manejo de variables de entorno

## Ejecución del Proyecto

## Configuración de Variables de Entorno (.env.example)

Este archivo sirve como plantilla para configurar las variables de entorno en el proyecto.

### Uso

1. Crea una copia de este archivo y renómbralo a `.env`:
    ```bash
    cp .env.example .env
    ```

2. Completa los valores apropiados para cada variable de entorno en el nuevo archivo `.env`

3. Nunca subas el archivo `.env` real al control de versiones - solo la plantilla `.env.example` debe ser incluida

### Notas Importantes

- El archivo `.env.example` debe contener todas las variables de entorno requeridas con valores de ejemplo
- La información sensible (contraseñas, claves API, etc.) nunca debe incluirse en el archivo `.env.example`
- Mantén el archivo `.env.example` actualizado cuando agregues nuevas variables de entorno al proyecto


### Usando Docker Compose
1. Asegúrate de tener Docker y Docker Compose instalados
2. En la raíz del proyecto, ejecuta:
```bash
docker-compose up
```
Este comando iniciará:
- La base de datos PostgreSQL en el puerto 5432
- La API en el puerto 3001

### Ejecución Local de la API
1. Desarrollo: `npm run dev`
2. Producción: `npm start`
