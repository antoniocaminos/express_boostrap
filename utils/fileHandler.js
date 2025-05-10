// utils/fileHandler.js
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Convertimos import.meta.url a ruta usable
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construimos la ruta al archivo personajes.json dentro de la carpeta Data
const filePath = path.join(__dirname, '..', 'Data', 'personajes.json');

// Leer personajes
export async function leerPersonajes() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error al leer el archivo');
  }
}

// Escribir personajes (para futuras rutas POST, PUT, DELETE)
export async function escribirPersonajes(personajes) {
  try {
    await writeFile(filePath, JSON.stringify(personajes, null, 2), 'utf-8');
  } catch (error) {
    throw new Error('Error al escribir el archivo');
  }
}
