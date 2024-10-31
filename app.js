const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const actorRoutes = require('./routes/actorRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const generoRoutes = require('./routes/generoRoutes')
const sequelize = require('./conexion/database');


// Middlewares
app.use(express.json());
app.use('/contenido', contenidoRoutes);
app.use('/actor', actorRoutes)
app.use('/categoria', categoriaRoutes)
app.use('/genero', generoRoutes)

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.authenticate()
  console.log(`Server running on port ${PORT}`);
});
    