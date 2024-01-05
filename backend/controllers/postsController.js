const { Op } = require('sequelize');
const Post = require("../models/Post");
const formatDate = require("../utils/formatDate");

const addPostController = async (request, response) => {

    const { title, contenido } = request.body

    try {
        const username = request.username
        const userId = request.userId

        const newPost = await Post.create({
            title,
            autor: username,
            contenido,
            userId,
            createdAt: formatDate(),
            updatedAt: formatDate()
        })

        response.status(200).json({ message: "Post nuevo creado", newPost })

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
}

const findPostController = async (request, response) => {

    const postId = request.params.postId

    try {
        const post = await Post.findOne({ where: { id: postId } })

        if (post) {
            response.status(200).json({ message: "Post", post })
        } else {
            response.status(400).json({ message: "Post no encontrado" })
        }


    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }

}

const userAllPostController = async ( request, response ) => {

    try {
        const userPosts = await Post.findAll({ where: { userId: request.userId } })
        response.status(200).json({ message: "Post", userPosts })
    }catch(error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }

}

const allPostController = async (request, response) => {

    try {

        const allPost = await Post.findAll({ order: [['updatedAt', 'DESC']] })
        response.status(200).json({ message: "Todos los posts", allPost })

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }

}

const updatePostController = async (request, response) => {
    const { title, contenido } = request.body
    const postId = request.params.postId


    try {
        const post = await Post.findOne({ where: { id: postId } })
        if (post) {
            const updatePost = await post.update({
                title,
                contenido,
                updatedAt: formatDate()
            })

            response.status(200).json({ message: "Post actualizado", updatePost })
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
}

const deletePostController = async( request, response ) => {
    const postId = request.params.postId

    try {

        await Post.destroy({ where: { id: postId } });
        response.status(200).json({ mensaje: "Post Borrado" })

    }catch(error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
}

const searchPostController = async( request, response ) => {

    try {
        const searchTerm = request.query.q;
    
        if (!searchTerm) {
          return res.status(400).json({ error: 'Se requiere un término de búsqueda' });
        }
    
        const results = await Post.findAll({
          where: {
            [Op.and]: [
                {
                  [Op.or]: [
                    {
                      title: {
                        [Op.like]: `%${searchTerm}%`,
                      },
                    },
                    {
                      contenido: {
                        [Op.like]: `%${searchTerm}%`,
                      },
                    },
                    {
                      autor: {
                        [Op.like]: `%${searchTerm}%`,
                      },
                    },
                  ],
                },
                {
                  userId: request.userId
                },
              ],
          },
        });
    
        response.json(results);
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno del servidor' });
      }

}

module.exports = {

    addPostController,
    findPostController,
    allPostController,
    updatePostController,
    deletePostController,
    userAllPostController,
    searchPostController

}