const { DataTypes } = require('sequelize')
const sequelize = require('../conexion/database')
const Contenido = require('./contenido')

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_categoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false
})


module.exports = Categoria
    