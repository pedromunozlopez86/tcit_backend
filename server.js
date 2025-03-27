require("reflect-metadata");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./config/orm-config");
const Post = require("./entities/post");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(cors());
app.use(express.json());

const postRepository = AppDataSource.getRepository("Post");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TCIT Posts API",
      version: "1.0.0",
      description: "API para manejo de posts TCIT",
    },
  },
  apis: ["./server.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Obtener todos los posts
app.get("/posts", async (req, res) => {
  const posts = await postRepository.find();
  res.json(posts);
});

// Crear un nuevo post
app.post("/posts", async (req, res) => {
  const newPost = postRepository.create(req.body);
  
  const savedPost = await postRepository.save(newPost);
  res.status(201).json(savedPost);
});

// Eliminar un post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await postRepository.findOne({ where: { id: Number(id) } });

  if (!post) return res.status(404).json({ error: "Post no encontrado" });

  await postRepository.remove(post);
  res.json(post);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los posts
 *     responses:
 *       200:
 *         description: Lista de posts
 *   post:
 *     summary: Crea un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post creado
 *
 * /posts/{id}:
 *   delete:
 *     summary: Elimina un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post eliminado
 *       404:
 *         description: Post no encontrado
 */
