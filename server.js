import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// RUTA PRINCIPAL → lista de Pokémon
app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    const data = await response.json();

    res.render('index', { pokemons: data.results });
  } catch (error) {
    res.status(500).send('Error al obtener la lista de Pokémon');
  }
});

// RUTA DETALLE → info de un Pokémon
app.get('/pokemon/:query', async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) throw new Error('Pokémon no encontrado');

    const pokemon = await response.json();
    res.render('pokemon', { pokemon });
  } catch (error) {
    res.status(404).send('Pokémon no encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});