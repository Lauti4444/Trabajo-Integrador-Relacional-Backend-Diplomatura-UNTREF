const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const actorRoutes = require('./routes/actorRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const generoRoutes = require('./routes/generoRoutes')
const sequelize = require('./conexion/database');
const { swaggerUi, swaggerDocs } = require('./swaggerConfig');


app.use(express.json());

//Swagger Config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//routes
app.use('/contenido', contenidoRoutes);
app.use('/actor', actorRoutes)
app.use('/categoria', categoriaRoutes)
app.use('/genero', generoRoutes)

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.authenticate()
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentación de la API en http://localhost:${PORT}/api-docs`)
});
    