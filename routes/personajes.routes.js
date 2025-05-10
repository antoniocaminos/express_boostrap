
import { Router } from 'express';// Importamos Router desde express para definir rutas en este archivo
import { leerPersonajes, escribirPersonajes } from '../utils/fileHandler.js';// Importamos las funciones para leer y escribir el archivo
const router = Router();// Creamos una nueva instancia del router
router.get('/', async (req, res) => {// Definimos la ruta para obtener todos los personajes
    const personajes = await leerPersonajes(); // Leemos todos los personajes del archivo
    res.json(personajes); // Respondemos con el array de personajes en formato JSON
  });

  router.get('/:id', async (req, res) => {// Leemos los personajes
  const personajes = await leerPersonajes(); 
  const personaje = personajes.find(p => p.id === parseInt(req.params.id)); // Buscamos el ID

  if (!personaje) {// Si no se encuentra, respondemos con error
    
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  res.json(personaje); // Si existe, lo devolvemos
});
///post
router.post('/', async (req, res) => {
    const personajes = await leerPersonajes(); // Leemos personajes actuales
    const nuevo = req.body; // Obtenemos el nuevo personaje del body
  
    // Asignamos un ID nuevo (sumando 1 al último)
    nuevo.id = personajes.length ? personajes[personajes.length - 1].id + 1 : 1;
  
    personajes.push(nuevo); // Lo agregamos al array
    await escribirPersonajes(personajes); // Guardamos el nuevo array
  
    res.status(201).json(nuevo); // Respondemos con el nuevo personaje
  });
//put
router.put('/:id', async (req, res) => {
    const personajes = await leerPersonajes(); // Leemos personajes
    const index = personajes.findIndex(p => p.id === parseInt(req.params.id)); // Buscamos el índice del personaje
  
    if (index === -1) {
      // Si no se encuentra, respondemos con error
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
  
    // Actualizamos el personaje con los datos nuevos
    personajes[index] = { ...personajes[index], ...req.body };
  
    await escribirPersonajes(personajes); // Guardamos cambios
  
    res.json(personajes[index]); // Respondemos con el personaje actualizado
  });
//del
router.delete('/:id', async (req, res) => {
    const personajes = await leerPersonajes(); // Leemos personajes
    const nuevos = personajes.filter(p => p.id !== parseInt(req.params.id)); // Quitamos el personaje con ese ID
  
    if (nuevos.length === personajes.length) {
      // Si no se eliminó nada, es porque el ID no existía
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
  
    await escribirPersonajes(nuevos); // Guardamos el nuevo array
  
    res.json({ mensaje: 'Personaje eliminado' }); // Confirmamos la eliminación
  });
  export default router;