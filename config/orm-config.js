const { DataSource } = require("typeorm");
const Post = require("../entities/post");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "tu_contraseña",
  database: process.env.DB_NAME || "posts_db",
  entities: [Post],
  synchronize: true, // ⚠️ Solo en desarrollo, usar migraciones en producción
  logging: false,
  autoloadEntities: true,
});

AppDataSource.initialize()
  .then(() => console.log("Conectado a PostgreSQL ", process.env.DB_NAME))
  .catch((error) => console.error("Error conectando a la BD:", error));

module.exports = { AppDataSource };

