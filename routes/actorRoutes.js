const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Actor = require('../models/actor');
const Contenido = require('../models/contenido');
const contenidoActor = require('../models/contenidoActor');

/**
 * @swagger
 * /actor:
 *   get:
 *     summary: Obtener todos los actores
 *     description: Endpoint para obtener una lista de todos los actores en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de actores.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Actor'
 *       500:
 *         description: no se pudieron traer los actores.
 *         content:
 *           application/json:
 *             example:
 *               error: no se pudieron traer los actores
 *               description: Mensaje de error detallado.
 */
router.get('/', async (req, res) => {
    try {
        const actores = await Actor.findAll()
        res.json(actores)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los actores' })
    }
});

/**
 * @swagger
 * /actor:
 *   post:
 *     summary: Crear un nuevo actor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actor'
 *     responses:
 *       201:
 *         description: Actor creado exitosamente
 *       500:
 *         description: no se pudo crear el actor
 */
router.post('/', async (req, res) => {
    try {
        const { nombre, apellido } = req.body
        const actorCreado = await Actor.create({ nombre, apellido })
        res.status(201).json(actorCreado)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear el actor' })
      }
});

/**
 * @swagger
 * /actor/{id}:
 *   delete:
 *     summary: Eliminar un actor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del actor
 *     responses:
 *       204:
 *         description: actor borrado con exito
 *       404:
 *         description: actor no encontrado
 *       500:
 *         description: no se pudo eliminar el actor
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const actorBorrado = await Actor.findByPk(id)
      if (!actorBorrado) {
        return res.status(404).send({ error: 'actor no encontrado' })
      }
      await actorBorrado.destroy()
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar el actor' })
    }
});

/**
 * @swagger
 * /actor/contenidos/asociados:
 *   get:
 *     summary: Obtener todas los actores con sus películas asociadas
 *     responses:
 *       200:
 *         description: Lista de todas los actores con sus películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       500:
 *         description: no se pudo listar los actores
 */
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