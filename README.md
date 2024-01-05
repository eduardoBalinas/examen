# Aplicación para Postear

Esta es una aplicación simple para postear contenido en un blog en línea. Permite a los usuarios publicar, ver, buscar y eliminar entradas en el blog.

## Funcionalidades

- **Alta de Usuarios:**
  - EL usuario se puede loguear para poder publicar sus posts

- **Alta de Entradas:**
  - Los usuarios pueden guardar nuevas entradas en el blog.
  - Cada entrada debe tener un título y contenido.

- **Listado de Entradas:**
  - Muestra un listado de todas las entradas en el blog.
  - Solo muestra los primeros setenta caracteres del contenido.

- **Búsquedas:**
  - Permite a los usuarios realizar búsquedas de entradas filtrando por título, contenido o autor.

- **Detalle de una Entrada:**
  - Al seleccionar una entrada del listado, se muestra el contenido completo de la entrada.

- **Obtención de Recursos:**
  - Los datos se obtienen a través de un servicio REST que proporciona métodos para consultar y guardar en el servidor.

## Tecnologías Utilizadas

- **Node.js:** Backend basado en Node.js utilizando Express.
- **Sequelize:** ORM para la interacción con la base de datos SQL.
- **React con Vite:** Frontend construido con React y Vite para una experiencia de desarrollo rápida.
- **Myssql:** La base de datos ocupada fue MySql

## Configuración y Ejecución

- **Configuracion backend:**
    - En la raiz del proyecto ir a la carpeta backend
    - cd backend
    - npm install
    - Configurar las variables de entorno para su conexion a la base de datos
    - En la carpeta config en el archivos json modificar la conexion de development
    - npm run migrate
    - npm start
- **Configuracion frontend:**
    - En la raiz del proyecto ir a la carpeta frontend
    - cd frontend
    - npm install
    - npm run dev
