const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Genero = require('../models/genero');
const Contenido = require('../models/contenido');
const contenidoGenero = require('../models/contenidoActor');

/**
 * @swagger
 * /genero:
 *   get:
 *     summary: Obtener todos los generos
 *     description: Endpoint para obtener una lista de todas los generos en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de generos.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Genero'
 *       500:
 *         description: no se pudieron traer los generos
 *         content:
 *           application/json:
 *             example:
 *               error: no se pudieron traer los generos
 *               description: Mensaje de error detallado.
 */
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.findAll()
        res.json(generos)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los generos' })
    }
});

/**
 * @swagger
 * /genero:
 *   post:
 *     summary: Crear un nuevo genero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genero'
 *     responses:
 *       201:
 *         description: Genero creado exitosamente
 *       500:
 *         description: no se pudo crear el genero
 */
router.post('/', async (req, res) => {
    try {
        const { nombre_genero } = req.body
        const GeneroCreado = await Genero.create({ nombre_genero })
        res.status(201).json(GeneroCreado)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear el genero' })
      }
});

/**
 * @swagger
 * /genero/{id}:
 *   delete:
 *     summary: Eliminar un genero
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del genero
 *     responses:
 *       204:
 *         description: genero borrado con exito
 *       404:
 *         description: genero no encontrado
 *       500:
 *         description: no se pudo eliminar el genero
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const generoBorrado = await Genero.findByPk(id)
      if (!generoBorrado) {
        return res.status(404).send({ error: 'genero no encontrado' })
      }
      await generoBorrado.destroy()
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar el genero' })
    }
});

/**
 * @swagger
 * /genero/contenidos/asociados:
 *   get:
 *     summary: Obtener todas los generos con los contenidos que lo referencian
 *     responses:
 *       200:
 *         description: Lista de todas los generos con los contenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 *       500:
 *         description: no se pudo listar los generos
 */
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