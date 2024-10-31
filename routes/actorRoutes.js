const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Actor = require('../models/actor');
const Contenido = require('../models/contenido');
const contenidoActor = require('../models/contenidoActor');

//trae todos los actores
router.get('/', async (req, res) => {
    try {
        const actores = await Actor.findAll()
        res.json(actores)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los actores' })
    }
});

//crea un actor
router.post('/', async (req, res) => {
    try {
        const { nombre, apellido } = req.body
        const actorCreado = await Actor.create({ nombre, apellido })
        res.status(201).json(actorCreado)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear el actor' })
      }
});

//borra un contenido por id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const actorBorrado = await Actor.findByPk(id)
      if (!actorBorrado) {
        return res.status(404).send({ error: 'actor no encontrado' })
      }
      await actorBorrado.destroy()
      res.json({ message: 'actor borrado con exito' })
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar el actor' })
    }
});

//obtener todos los actores con sus peliculas
router.get('/contenidos/asociados', async (req, res) => {
  try {
    const actores = await Actor.findAll(
      {
        include: {
          model: Contenido
        }
      }
    )
    res.status(200).json(actores)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo listar los actores' })
  }
})


module.exports = router;