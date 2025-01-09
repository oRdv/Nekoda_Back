/****************************************************************************************
* Objetivo: Arquivo responsável por interagir com a tabela "Posts" do banco de dados
* Data: 08/01/2025
* Autor: Tamires Fernandes
****************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const selectAllPosts = async () => {
    return await prisma.posts.findMany({
        include: { users: true }, 
    });
};


const selectPostById = async (id) => {
    return await prisma.posts.findUnique({
        where: { id: parseInt(id) },
        include: { users: true }, 
    });
};

const insertPost = async (post) => {
    return await prisma.posts.create({
        data: {
            title: post.title,
            body: post.body,
            user_id: post.user_id,
        },
    });
};


const updatePost = async (post, id) => {
    return await prisma.posts.update({
        where: { id: parseInt(id) },
        data: {
            title: post.title,
            body: post.body,
            user_id: post.user_id,
        },
    });
};


const deletePost = async (id) => {
    return await prisma.posts.delete({
        where: { id: parseInt(id) },
    });
};


const selectLastId = async () => {
    const lastPost = await prisma.posts.findFirst({
        orderBy: { id: 'desc' },
    });
    return lastPost ? lastPost.id : null;
};

module.exports = {
    selectAllPosts,
    selectPostById,
    insertPost,
    updatePost,
    deletePost,
    selectLastId,
};
