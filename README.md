# 🚀 Proyecto BackEnd PROMETEO

Backend desarrollado con **Node.js**, **Express**, **MongoDB**, **Mongoose** y **Cloudinary**.  
Incluye autenticación con **JWT**, encriptación de contraseñas con **bcrypt**, subida de imágenes a la nube y gestión completa de usuarios, posts y comentarios.

---

## 🧩 Tecnologías principales

- **Node.js**  
- **Express.js**  
- **MongoDB** + **Mongoose**  
- **Cloudinary** (gestión de imágenes)  
- **bcrypt** (encriptación de contraseñas)  
- **jsonwebtoken (JWT)**  
- **dotenv**  
- **multer** (subida de archivos)  
- **nodemon** (entorno de desarrollo)

---

## 📁 Estructura del proyecto

```
src/
├── api/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   ├── data/
│   │   └── userData.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   ├── file.js
│   │   └── isAuth.js
│   ├── models/
│   │   ├── Comment.model.js
│   │   ├── Post.model.js
│   │   └── User.model.js
│   ├── routers/
│   │   ├── auth.router.js
│   │   ├── comment.router.js
│   │   ├── post.router.js
│   │   └── user.router.js
│   └── utils/
│       ├── seeds/
│       │   └── seedUsers.js
│       ├── deleteFiles.js
│       └── jwt.js
│
├── public/
│   └── assets/
│       ├── user1.png
│       ├── user2.png
│       ├── ...
│       └── user10.png
│
├── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/DeibyGS/ProyectoBackEndPROMETEO.git
cd ProyectoBackEndPROMETEO
npm install
```

---

## 🧠 Configuración del entorno (.env)

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreDB>

JWT_SECRET=tu_clave_secreta

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## 🧩 Ejecución del proyecto

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

Por defecto se ejecutará en [http://localhost:3000](http://localhost:3000)

---

## 🌱 Semilla de usuarios

El proyecto incluye un script para generar automáticamente 10 usuarios con imágenes en Cloudinary.

Ejecuta la seed:

```bash
node src/api/utils/seeds/seedUsers.js
```

Esto:
- Limpia la colección `User` en MongoDB.  
- Borra imágenes previas de Cloudinary (carpeta `usersSeed`).  
- Sube las nuevas imágenes de `/public/assets/`.  
- Inserta los usuarios con contraseñas **hasheadas**.

---

## 🔐 Endpoints principales

### 🧾 **Auth Routes** (`/api/auth`)
| Método | Ruta | Descripción |
|:-------|:------|:------------|
| `POST` | `/register` | Registra un nuevo usuario |
| `POST` | `/login` | Inicia sesión y devuelve un token JWT |

---

### 👥 **User Routes** (`/api/users`)
| Método | Ruta | Descripción |
|:-------|:------|:------------|
| `GET` | `/` | Obtener todos los usuarios |
| `GET` | `/:id` | Obtener usuario por ID |
| `DELETE` | `/:id` | Eliminar usuario (también borra su imagen en Cloudinary) |

---

### 📝 **Post Routes** (`/api/posts`)
| Método | Ruta | Descripción |
|:-------|:------|:------------|
| `GET` | `/` | Listar todos los posts |
| `POST` | `/` | Crear un nuevo post (requiere autenticación) |
| `DELETE` | `/:id` | Eliminar un post |

---

### 💬 **Comment Routes** (`/api/comments`)
| Método | Ruta | Descripción |
|:-------|:------|:------------|
| `GET` | `/` | Listar todos los comentarios |
| `POST` | `/` | Crear un comentario |
| `DELETE` | `/:id` | Eliminar un comentario |

---

## 🧪 Ejemplo de uso en **Insomnia**

### 🔐 Login de usuario

**Método:** `POST`  
**URL:** `http://localhost:3000/api/auth/login`  

**Body (JSON):**
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "671fdb8b9b2e...",
    "username": "user1",
    "email": "user1@example.com",
    "image": "https://res.cloudinary.com/.../usersSeed/user1.png"
  }
}
```

Guarda el `token` en Insomnia para las rutas protegidas.

---

## 📦 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Ejecuta el servidor con Nodemon |
| `npm start` | Inicia el servidor en modo producción |
| `node src/api/utils/seeds/seedUsers.js` | Ejecuta la semilla de usuarios |

---

## 🧰 Dependencias principales

```json
"dependencies": {
  "bcrypt": "^5.1.0",
  "cloudinary": "^1.39.1",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.1",
  "mongoose": "^8.0.0",
  "multer": "^1.4.5"
},
"devDependencies": {
  "nodemon": "^3.0.2"
}
```

---

## 👨‍💻 Autor

**Deiby Gorrín**  
Desarrollador Full Stack  
📧 [Tu email o LinkedIn si deseas incluirlo]  

---

## 🪪 Licencia

Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y distribuirlo libremente, siempre que se mantenga la atribución al autor original.
