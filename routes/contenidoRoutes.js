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

/**
 * @swagger
 * /contenido:
 *   get:
 *     summary: Obtener todos los contenidos
 *     responses:
 *       200:
 *         description: Lista de todos los contenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       500:
 *         description: no se pudieron traer los contenidos
 */
router.get('/', async (req, res) => {
    try {
        const contenido = await Contenido.findAll()
        res.json(contenido)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los contenidos' })
    }
});

/**
 * @swagger
 * /contenido/{id}:
 *   get:
 *     summary: Obtener un contenido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido
 *     responses:
 *       200:
 *         description: Datos del contenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contenido'
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: no se pudo traer el contenido
 */
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
/**
 * @swagger
 * /contenido/filtrar/{busqueda}:
 *   get:
 *     summary: Filtra contenidos (1 para pelis, 2 para series y texto para nombre o genero)
 *     parameters:
 *       - in: path
 *         name: busqueda
 *         required: true
 *         schema:
 *           type: string
 *         description: tags del campo "busqueda"
 *     responses:
 *       200:
 *         description: Datos de los contenidos que cumplen la condicion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       500:
 *         description: no se pudieron traer los contenido
 */
router.get('/filtrar/:busqueda', async (req, res) => {
    const  {busqueda}  = req.params
    try {
        const contenido = await Contenido.findAll({
            where:{
                [op.or]:[{busqueda:{[op.like]:`%${busqueda}%`}},{categoria:busqueda}]             
            }
        })
        res.json(contenido)
    } catch (error) {
        res.status(500).send({ error: 'no se pudieron traer los contenidos' })
    }
});

/**
 * @swagger
 * /contenido:
 *   post:
 *     summary: Crea un nuevo contenido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contenido'
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *       500:
 *         description: no se pudo crear el contenido
 */
router.post('/', async (req, res) => {
    try {
        const { titulo, categoria, busqueda, resumen, temporadas, duracion, poster, trailer } = req.body
        const contenidoCreado = await Contenido.create({ titulo, categoria, busqueda, resumen, temporadas, duracion, poster, trailer })
        res.status(201).json(contenidoCreado)
      } catch (error) {
        res.status(500).send({ error: 'no se pudo crear el contenido' })
      }
});

/**
 * @swagger
 * /contenido/{id}:
 *   put:
 *     summary: Actualizar un contenido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contenido'
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *       404:
 *         description: contenido no encontrado
 *       500:
 *         description: no se pudo actualizar el contenido
 */
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

/**
 * @swagger
 * /contenido/{id}:
 *   delete:
 *     summary: Eliminar un contenido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido
 *     responses:
 *       204:
 *         description: contenido borrado con exito
 *       404:
 *         description: contenido no encontrado
 *       500:
 *         description: no se pudo eliminar el contenido
 */
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

/**
 * @swagger
 * /contenido/{idcontenido}/actor/{idactor}:
 *   post:
 *     summary: Relaciona un actor con un contenido
 *     parameters:
 *       - in: path
 *         name: idcontenido
 *         required: true
 *         schema:
 *         type: integer
 *         description: ID del contenido
 *       - in: path
 *         name: idactor
 *         required: true
 *         schema:
 *         type: integer
 *         description: ID del actor
 *     responses:
 *       201:
 *         description: contenido y actor asociado correctamente
 *       404:
 *         description: contenido o actor no encontrado
 *       500:
 *         description: no se pudo asociar
 */
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

/**
 * @swagger
 * /contenido/{idcontenido}/actor/{idgenero}:
 *   post:
 *     summary: Relaciona un genero con un contenido
 *     parameters:
 *       - in: path
 *         name: idcontenido
 *         required: true
 *         schema:
 *         type: integer
 *         description: ID del contenido
 *       - in: path
 *         name: idgenero
 *         required: true
 *         schema:
 *         type: integer
 *         description: ID del genero
 *     responses:
 *       201:
 *         description: contenido y genero asociado correctamente
 *       404:
 *         description: contenido o genero no encontrado
 *       500:
 *         description: no se pudo asociar
 */
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

/**
 * @swagger
 * /contenido/actores/asociados:
 *   get:
 *     summary: Obtener todas los contenidos con sus actores asociadas
 *     responses:
 *       200:
 *         description: Lista de todas los contenidos con sus actores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       500:
 *         description: no se pudo listar los contenidos
 */
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

/**
 * @swagger
 * /contenido/generos/asociados:
 *   get:
 *     summary: Obtener todas los contenidos con sus generos asociadas
 *     responses:
 *       200:
 *         description: Lista de todas los contenidos con sus generos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       500:
 *         description: no se pudo listar los contenidos
 */
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
    