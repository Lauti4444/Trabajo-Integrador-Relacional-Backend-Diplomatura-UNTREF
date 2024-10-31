const { DataTypes } = require('sequelize')
const sequelize = require('../conexion/database')
const Actor = require('./actor')
const Contenido = require('./contenido')

const contenidoActor = sequelize.define('contenidoActor', {
    id_contenido: {
      type: DataTypes.INTEGER,
      references: {
        model: Contenido,
        key: 'id_contenido'
      }
    },
    id_actor: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor,
        key: 'id_actor'
      }
    }
  }, {
    tableName: 'contenido_actores',
    timestamps: false
  })
  
  // Definir las relaciones
  Contenido.belongsToMany(Actor, { through: contenidoActor, foreignKey: 'id_contenido' })
  Actor.belongsToMany(Contenido, { through: contenidoActor, foreignKey: 'id_actor' })
  
  module.exports = contenidoActor