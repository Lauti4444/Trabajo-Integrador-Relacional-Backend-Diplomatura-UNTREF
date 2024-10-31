const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Genero = require('../models/genero');
const Contenido = require('../models/contenido');
const contenidoGenero = require('../models/contenidoActor');

//trae todos los generos
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.findAll()
        res.json(generos)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los generos' })
    }
});

//crea una categoria
router.post('/', async (req, res) => {
    try {
        const { nombre_genero } = req.body
        const GeneroCreado = await Genero.create({ nombre_genero })
        res.status(201).json(GeneroCreado)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear el genero' })
      }
});

//borra una categoria por id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const generoBorrado = await Genero.findByPk(id)
      if (!generoBorrado) {
        return res.status(404).send({ error: 'genero no encontrado' })
      }
      await generoBorrado.destroy()
      res.json({ message: 'genero borrado con exito' })
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar el genero' })
    }
});

//obtener todas los generos con sus contenidos
router.get('/contenidos/asociados', async (req, res) => {
  try {
    const generos = await Genero.findAll(
      {
        include: {
          model: Contenido
        }
      }
    )
    res.status(200).json(generos)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo listar los generos' })
  }
})


module.exports = router;