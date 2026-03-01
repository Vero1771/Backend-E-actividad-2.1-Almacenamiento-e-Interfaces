# Backend-E-actividad-2.1-Almacenamiento-e-Interfaces

## Sistema de Gestión de Cine

Proyecto web (Express + EJS) para gestionar un cine con las entidades: Películas, Funciones, Salas, Ventas, Productos y Entradas.

### Resumen de las características principales

- Ingresar datos a todas las entidades definidas.
- Mostrar elementos de una determinada entidad por su id.
- Mostrar los últimos 5 elementos de algún grupo de una entidad según un criterio de ordenamiento específico. (Las últimas 5 funciones más recientes)
- Mostrar los elementos de una entidad en un rango de fecha. (Mostrar ventas en un rango específico)
- Eliminar elementos de todas las entidades definidas. 
- Eliminar la relación entre elementos de dos o más entidades. 
- Modificar datos de todas las entidades definidas.
- Vistas EJS para administración y para usuarios finales.

### Estructura importante del proyecto

- `app.js` — punto de entrada (monta rutas y middlewares).
- `routes/` — rutas para `entradas`, `funciones`, `peliculas`, `productos`, `salas`, `ventas`, `ventas de productos` etc.
- `controllers/` — lógica de negocio para cada entidad.
- `models/` — manejo de promesas para consultas con la base de datos.
- `views/` — plantillas EJS (vistas del sistema).
- `db/` — archivo de conexión con la base de datos (Adicionalmente se encuentra adjunto el archivo para recrear la base de datos).

### Requisitos

- Node.js (>= 16 recomendado) y `npm`.
- Xampp Control Panel (Para manejar la base de datos mysql) o algún gestor de bases de datos sql.
- Archivo .sql para recrear la base de datos del proyecto.
- Archivo .env con las variables de entorno para la base de datos. En caso de que quiera recrearlo escriba lo siguiente en su archivo .env: 

```

DB_HOST = localhost
DB_USER = root
DB_PASSWORD = 
DB_DATABASE = cine

```

### Instalación y puesta en marcha (Windows / PowerShell)

1. Crear la base de datos con el nombre "cine":

- Si utiliza una herramienta grafica como la que le ofrece Xampp con phpMyAdmin puede importar directamente el archivo sql adjunto en el proyecto.
- En caso de que use algún otro gestor de bases de datos sql puede reconstruir la base de datos utilizando los comandos del archivo sql para recrearla.

2. Poner en marcha la base de datos

- Si utiliza Xampp ponga en marcha el gestor phpMyAdmin al presionar start para "Apache" y "MySQL".
- En caso de utilizar otro servicio levante la base de datos creada por medio de comandos.

3. Ajuste sus variables de entorno en el archivo .env para asegurar la conexión con la base de datos.

- DB_HOST = [Indique el host]
- DB_USER = [Indique el usuario que usa su base de datos]
- DB_PASSWORD = [Indique la contraseña en caso de que su base de datos la tenga]
- DB_DATABASE = [Indique el nombre de su base de datos]

4. Clonar el repositorio y entrar en el directorio:

```powershell
git clone <repo-url>
cd 'Backend-E-actividad-2.1-Almacenamiento-e-Interfaces'
```

5. Instalar dependencias:

```powershell
npm install
```

6. Iniciar la aplicación (modo desarrollo con `nodemon`):

```powershell
npm run dev
```

7. Simular alguna de las posibles peticiones del frontend utilizando Thunder Client.

- `/peliculas` 
  - `/mostrar` — (GET) Mostrar todas las películas.
  - `/buscar/:id` — (GET) Mostrar películas por su ID.
  - `/ingresar` — (POST) Ingresar películas.
  - `/editar/:id` — (PUT) Editar películas.
  - `/eliminar/:id` — (DELETE) Eliminar películas por su ID.

- `/funciones` 
  - `/mostrar` — (GET) Mostrar todas las funciones.
  - `/buscar/:id` — (GET) Mostrar funciones por su ID.
  - `/funciones_recientes` — (GET) Mostrar las últimas 5 funciones recientes.
  - `/ingresar` — (POST) Ingresar funciones.
  - `/editar/:id` — (PUT) Editar funciones.
  - `/eliminar/:id` — (DELETE) Eliminar funciones por su ID.

- `/salas` 
  - `/mostrar` — (GET) Mostrar todas las salas.
  - `/buscar/:id` — (GET) Mostrar salas por su ID.
  - `/ingresar` — (POST) Ingresar salas.
  - `/editar/:id` — (PUT) Editar salas.
  - `/eliminar/:id` — (DELETE) Eliminar salas por su ID.

- `/ventas` 
  - `/mostrar` — (GET) Mostrar todas las ventas.
  - `/buscar/:id` — (GET) Mostrar ventas por su ID.
  - `/rango` — (GET) Mostrar ventas en un rango de fecha.
  - `/ingresar` — (POST) Ingresar ventas.
  - `/editar/:id` — (PUT) Editar ventas.
  - `/eliminar/:id` — (DELETE) Eliminar ventas por su ID.

- `/productos` 
  - `/mostrar` — (GET) Mostrar todos los productos.
  - `/buscar/:id` — (GET) Mostrar productos por su ID.
  - `/ingresar` — (POST) Ingresar productos.
  - `/editar/:id` — (PUT) Editar productos.
  - `/eliminar/:id` — (DELETE) Eliminar productos por su ID.

- `/ventas_productos` 
  - `/mostrar` — (GET) Mostrar todas las ventas de productos.
  - `/buscar/:id` — (GET) Mostrar ventas de productos por su ID.
  - `/ingresar` — (POST) Ingresar ventas de productos.
  - `/editar/:id` — (PUT) Editar ventas de productos.
  - `/eliminar/:id` — (DELETE) Eliminar ventas de productos por su ID.

- `/entradas` 
  - `/mostrar` — (GET) Mostrar todas las entradas.
  - `/buscar/:id` — (GET) Mostrar entradas por su ID.
  - `/ingresar` — (POST) Ingresar entradas.
  - `/editar/:id` — (PUT) Editar entradas.
  - `/eliminar/:id` — (DELETE) Eliminar entradas por su ID.

8. Acceder en el navegador a `http://localhost:3000/` para interactuar con la interfaz EJS.

### Entradas JSON (Ejemplos)

Para probar las consultas de ingresar y editar de cada entidad:

- Películas
  - Ingresar/editar:

  ```
    {
      "titulo": "Star Wars: Episodio IV",
      "anio": 1977,
      "duracion": 125,
      "id_clasificacion": 1,
      "categorias": [1,2]
    }
  ```

- Funciones
  - Ingresar/editar:

  ```
    {
      "id_pelicula": 13,
      "id_sala": 3,
      "fecha_hora": "2026-02-14 18:00:00"
    }
  ```

- Salas
  - Ingresar/editar:

  ```
    {
      "nombre": "Sala Platino",
      "capacidad": 200
    }
  ```

- Ventas
  - Ingresar:

  ```
    {
      "id_metodo": 2,
      "total": 12.50
    }
  ```

  - Editar:

  ```
    {
      "id_metodo": 3,
      "fecha": "2025-01-01 18:00:00",
      "total": 50.2
    }
  ```

- Productos
  - Ingresar/editar:

  ```
    {
      "nombre": "chicle",
      "cantidad": 150,
      "precio_unitario": 2.50
    }
  ```

- Ventas de Productos
  - Ingresar:

  ```
    {
      "id_metodo": 2,
      "productos": [
        {
          "id_producto": 1,
          "cantidad": 1,
          "subtotal": 10
        },
        {
          "id_producto": 2,
          "cantidad": 3,
          "subtotal": 6
        }
      ]
    }
  ```

  - Editar:

  ```
    {
      "id_producto": 1,
      "cantidad": 3,
      "subtotal": 30
    }
  ```

- Entradas
  - Ingresar:

  ```
    {
      "id_metodo": 2,
      "entradas": [
        {
          "id_funcion": 4,
          "id_asiento": 1,
          "precio": 5
        },
        {
          "id_funcion": 4,
          "id_asiento": 2,
          "precio": 5
        }
      ]
    }
  ```

  - Editar:

  ```
    {
      "id_funcion": 1,
      "id_asiento": 3,
      "precio": 15  
    }
  ```

---

Licencia
- Este proyecto es un ejercicio/plantilla.