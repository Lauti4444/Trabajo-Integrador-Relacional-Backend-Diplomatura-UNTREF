const { DataTypes } = require('sequelize')
const sequelize = require('../conexion/database')

const Actor = sequelize.define('Actor', {
  id_actor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'actores',
  timestamps: false
})

module.exports = Actor
    