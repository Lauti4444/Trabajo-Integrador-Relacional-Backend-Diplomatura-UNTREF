const { DataTypes } = require('sequelize')
const sequelize = require('../conexion/database')
const Categoria = require('./categoria')

const Contenido = sequelize.define('Contenido', {
  id_contenido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.INTEGER,
    references: {
        model: Categoria,
        key: 'id_categoria' 
    }
  },
  busqueda: {
    type: DataTypes.STRING
  },
  resumen: {
    type: DataTypes.STRING
  },
  temporadas:{
    type: DataTypes.INTEGER
  },
  duracion:{
    type: DataTypes.INTEGER
  },
  poster:{
    type: DataTypes.STRING
  },
  trailer:{
    type: DataTypes.STRING
  }

  
}, {
  tableName: 'contenido',
  timestamps: false
})


module.exports = Contenido