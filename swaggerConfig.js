const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Contenido Multimedia',
      version: '1.0.0',
      description: 'Documentación generada con Swagger para la API de Contenido Multimedia',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        url: 'https://trabajo-integrador-sql-production.up.railway.app/api-docs/'
      },
    ],
    components: {
      schemas: {
        Actor: {
          type: 'object',
          properties: {
            id_actor: {
              type: 'integer',
              description: 'ID único del actor',
              example: 1,
            },
            nombre: {
              type: 'string',
              description: 'Nombre del actor',
              example: 'Lautaro',
            },
            apellido: {
              type: 'string',
              description: 'Apellido del actor',
              example: 'Lopez',
            },
          },
          required: ['nombre', 'apellido'],
        },
        Contenido: {
          type: 'object',
          properties: {
            id_contenido: {
              type: 'integer',
              description: 'ID único del contenido',
              example: 1,
            },
            titulo: {
              type: 'string',
              description: 'Título del contenido',
              example: 'Pepa Pig',
            },
            categoria: {
              type: 'integer',
              description: 'Clave foranea que hace referencia al id_categoria',
              example: 1,
            },
            busqueda: {
              type: 'string',
              description: 'Tags para facilitar la busqueda',
              example: "Enola Holmes, Ficción, Drama, Misterio, Millie Bobby Brown, Henry Cavill, Sam Claflin, Helena Bonham Carter, Louis Partridge, Adeel Akhtar",
            },
            resumen: {
                type: 'string',
                description: 'Sinopsis del contenido',
                example: "La hermana menor de Sherlock, descubre que su madre ha desaparecido y se dispone a encontrarla.",
            },
            temporadas: {
                type: 'integer',
                description: 'Cantidad de temporadas del contenido (null si es una pelicula)',
                example: 1,
            },
            duracion: {
                type: 'string',
                description: 'Duracion en minutos del contenido (0 si es una serie)',
                example: 97,
            },
            poster: {
                type: 'string',
                description: 'Ubicacion del poster del contenido',
                example: "./posters/6.jpg",
            },
            trailer: {
                type: 'string',
                description: 'Enlace para acceder al trailer del contenido',
                example: "https://www.youtube.com/embed/3t1g2pa355k",
            }
            
          },
          required: ['titulo', 'categoria', 'busqueda', 'resumen', 'temporadas', 'duracion', 'poster', 'trailer'],
        },
        Categoria: {
          type: 'object',
          properties: {
            id_categoria: {
              type: 'integer',
              description: 'ID de la categoria',
              example: 1,
            },
            nombre_categoria: {
              type: 'string',
              description: 'Nombre de la categoria',
              example: 'Serie',
            },
          },
          required: ['nombre_categoria'],
        },
        Genero: {
            type: 'object',
            properties: {
              id_genero: {
                type: 'integer',
                description: 'ID del genero',
                example: 1,
              },
              nombre_genero: {
                type: 'string',
                description: 'Nombre del genero',
                example: 'Drama',
              },
            },
            required: ['nombre_genero'],
        },
        contenidoActor: {
            type: 'object',
            properties: {
              id_contenido: {
                type: 'integer',
                description: 'Clave foranea que referencia a id_contenido',
                example: 1,
              },
              id_actor: {
                type: 'integer',
                description: 'Clave foranea que referencia a id_actor',
                example: 1,
              },
            },
            required: ['id_contenido', 'id_actor'],
        },
        contenidoGenero: {
            type: 'object',
            properties: {
              id_contenido: {
                type: 'integer',
                description: 'Clave foranea que referencia a id_contenido',
                example: 1,
              },
              id_genero: {
                type: 'integer',
                description: 'Clave foranea que referencia a id_genero',
                example: 1,
              },
            },
            required: ['id_contenido', 'id_genero'],
        },
      },
    },
  },
  apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

module.exports = { swaggerDocs, swaggerUi }