const { DataTypes } = require('sequelize')
const sequelize = require('../conexion/database')
const Genero = require('./genero')
const Contenido = require('./contenido')

const contenidoGenero = sequelize.define('contenidoGenero', {
    id_contenido: {
      type: DataTypes.INTEGER,
      references: {
        model: Contenido,
        key: 'id_contenido'
      }
    },
    id_genero: {
      type: DataTypes.INTEGER,
      references: {
        model: Genero,
        key: 'id_genero'
      }
    }
  }, {
    tableName: 'contenido_generos',
    timestamps: false
  })
  
  // Definir las relaciones
  Genero.belongsToMany(Contenido, { through: contenidoGenero, foreignKey: 'id_genero' })
  Contenido.belongsToMany(Genero, { through: contenidoGenero, foreignKey: 'id_contenido' })
  
  module.exports = contenidoGenero