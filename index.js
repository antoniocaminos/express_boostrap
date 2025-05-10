// Importamos Express (usando ES Modules)
import express from 'express';

// Importamos las rutas desde la carpeta routes
import personajesRoutes from './routes/personajes.routes.js';

const app = express(); // Creamos una instancia de Express
const PORT = 3000;     // Definimos el puerto del servidor

// Middleware para que Express entienda JSON en el body de las peticiones
app.use(express.json());

// Asociamos las rutas al endpoint base /personajes
app.use('/personajes', personajesRoutes);

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Server is alive at port:${PORT}`);
});
/* ruta para renderizar nuestro back en html */
app.use(express.static('public'))