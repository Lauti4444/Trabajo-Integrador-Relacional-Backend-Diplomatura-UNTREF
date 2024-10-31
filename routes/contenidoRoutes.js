const express = require('express');
const router = express.Router();
const sequelize = require('../conexion/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Contenido = require('../models/contenido');
const Categoria = require('../models/categoria');
const Genero = require('../models/genero');
const Actor = require('../models/actor');
const contenidoActor = require('../models/contenidoActor');
const contenidoGenero = require('../models/contenidoGenero');

// Routes for CRUD

//trae todos los contenidos
router.get('/', async (req, res) => {
    try {
        const contenido = await Contenido.findAll()
        res.json(contenido)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los contenidos' })
    }
});

//trae contenido por id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const contenido = await Contenido.findByPk(id)
        if (!contenido) {
            return res.status(404).send({ error: 'contenido no encontrado' })
          }
        res.json(contenido)
    } catch (error) {
        res.status(500).send({ error: 'no se pudo traer el contenido' })
    }
});

//Filtra contenidos (1 para pelis, 2 para series y texto para nombre o genero)
router.get('/filtrar/:busqueda', async (req, res) => {
    const  {busqueda}  = req.params
    try {
        const contenido = await Contenido.findAll({
            where:{
                [op.or]:[{categoria:busqueda},{busqueda:`%${busqueda}%`}]             
            }
        })
        res.json(contenido)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los contenidos' })
    }
});

//crea un contenido
router.post('/', async (req, res) => {
    try {
        const { titulo, categoria, busqueda, resumen, temporadas, duracion, poster, trailer } = req.body
        const contenidoCreado = await Contenido.create({ titulo, categoria, busqueda, resumen, temporadas, duracion, poster, trailer })
        res.status(201).json(contenidoCreado)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear el contenido' })
      }
});

//actualiza un contenido
router.put('/:id', async (req, res) => {
    const { id } = req.params
  const { titulo, categoria, busqueda, resumen, temporadas, duracion, poster, trailer } = req.body
  try {
    const contenidoAcutualizado = await Contenido.findByPk(id)
    if (!contenidoAcutualizado) {
      return res.status(404).send({ error: 'contenido no encontrado' })
    }
    contenidoAcutualizado.titulo = titulo
    contenidoAcutualizado.categoria = categoria
    contenidoAcutualizado.busqueda = busqueda
    contenidoAcutualizado.resumen = resumen
    contenidoAcutualizado.temporadas = temporadas
    contenidoAcutualizado.duracion = duracion
    contenidoAcutualizado.poster = poster
    contenidoAcutualizado.trailer = trailer

    await contenidoAcutualizado.save()

    res.json(contenidoAcutualizado)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo actualizar el contenido' })
  }
});

//borra un contenido por id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const contenidoBorrado = await Contenido.findByPk(id)
      if (!contenidoBorrado) {
        return res.status(404).send({ error: 'contenido no encontrado' })
      }
      await contenidoBorrado.destroy()
      res.json({ message: 'contenido borrado con exito' })
      res.status(204).send()
    } catch (error) {
      res.status(500).send({ error: 'no se pudo eliminar el contenido' })
    }
});

//relacionar actores con contenidos
router.post('/:idcontenido/actor/:idactor', async (req, res) => {
    try {
        const { idcontenido, idactor } = req.params
        const contenido = await Contenido.findByPk(idcontenido)
        const actor = await Actor.findByPk(idactor)
        if (!contenido) {
            return res.status(404).send({ error: 'contenido no encontrado' })
          }
        if (!actor) {
            return res.status(404).send({ error: 'actor no encontrado' })
          }
        
        await contenido.addActor(actor)

        res.status(201).json({message: 'contenido y actor asociado correctamente'})
      } catch (error) {
        res.status(500).send({ error: 'no se pudo asociar' })
      }
});

//relacionar generos con contenidos
router.post('/:idcontenido/genero/:idgenero', async (req, res) => {
    try {
        const { idcontenido, idgenero } = req.params
        const contenido = await Contenido.findByPk(idcontenido)
        const genero = await Genero.findByPk(idgenero)
        if (!contenido) {
            return res.status(404).send({ error: 'contenido no encontrado' })
          }
        if (!genero) {
            return res.status(404).send({ error: 'genero no encontrado' })
          }
        
        await contenido.addGenero(genero)

        res.status(201).json({message: 'contenido y genero asociado correctamente'})
      } catch (error) {
        res.status(500).send({ error: 'no se pudo asociar' })
      }
});

//obtener todas las peliculas con sus actores
router.get('/actores/asociados', async (req, res) => {
    try {
      const contenido = await Contenido.findAll(
        {
          include: {
            model: Actor
          }
        }
      )
      res.status(200).json(contenido)
    } catch (error) {
      res.status(500).send({ error: 'no se pudo listar los contenidos' })
    }
  })

//obtener todas los contenidos con sus generos
router.get('/generos/asociados', async (req, res) => {
    try {
      const contenido = await Contenido.findAll(
        {
          include: {
            model: Genero
          }
        }
      )
      res.status(200).json(contenido)
    } catch (error) {
      res.status(500).send({ error: 'no se pudo listar los contenidos' })
    }
  })

  
module.exports = router;
    