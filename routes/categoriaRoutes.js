const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Categoria = require('../models/categoria');

/**
 * @swagger
 * /categoria:
 *   get:
 *     summary: Obtener todos las categorias
 *     description: Endpoint para obtener una lista de todas las categorias en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de categorias.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: no se pudieron traer las categorias.
 *         content:
 *           application/json:
 *             example:
 *               error: no se pudieron traer las categorias
 *               description: Mensaje de error detallado.
 */
router.get('/', async (req, res) => {
    try {
        const categoria = await Categoria.findAll()
        res.json(categoria)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer las categorias' })
    }
});

/**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Crear una nueva categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria creada exitosamente
 *       500:
 *         description: no se pudo crear la categoria
 */
router.post('/', async (req, res) => {
    try {
        const { nombre_categoria } = req.body
        const categoriaCreada = await Categoria.create({ nombre_categoria })
        res.status(201).json(categoriaCreada)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear la categoria' })
      }
});

/**
 * @swagger
 * /categoria/{id}:
 *   delete:
 *     summary: Eliminar una categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria
 *     responses:
 *       204:
 *         description: categoria borrado con exito
 *       404:
 *         description: categoria no encontrada
 *       500:
 *         description: no se pudo eliminar la categoria
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const categoriaBorrada = await Categoria.findByPk(id)
      if (!categoriaBorrada) {
        return res.status(404).send({ error: 'categoria no encontrada' })
      }
      await categoriaBorrada.destroy()
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar la categoria' })
    }
});


module.exports = router;