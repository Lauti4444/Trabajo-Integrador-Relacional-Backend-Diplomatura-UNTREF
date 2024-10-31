const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Categoria = require('../models/categoria');

//trae todos las categorias
router.get('/', async (req, res) => {
    try {
        const categoria = await Categoria.findAll()
        res.json(categoria)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer las categorias' })
    }
});

//crea una categoria
router.post('/', async (req, res) => {
    try {
        const { nombre_categoria } = req.body
        const categoriaCreada = await Categoria.create({ nombre_categoria })
        res.status(201).json(categoriaCreada)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear la categoria' })
      }
});

//borra una categoria por id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const categoriaBorrada = await Categoria.findByPk(id)
      if (!categoriaBorrada) {
        return res.status(404).send({ error: 'categoria no encontrada' })
      }
      await categoriaBorrada.destroy()
      res.json({ message: 'categoria borrado con exito' })
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar la categoria' })
    }
});


module.exports = router;