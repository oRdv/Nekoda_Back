/****************************************************************************************
* Objetivo: Arquivo responsável por interagir com a tabela "Users" do banco de dados
* Data: 08/01/2025
* Autor: Tamires Fernandes
****************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const selectAllUsers = async () => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                created_at: true,
                updated_at: true,
            },
        });
        return users;
    } catch (error) {
        console.error('Erro no selectAllUsers:', error.message);
        throw error; // Certifique-se de capturar esse erro no controlador
    }
};

// Seleciona um usuário pelo ID
const selectUserById = async (id) => {
    return await prisma.users.findUnique({
        where: { id: parseInt(id) },
    });
};


const validateUserLogin = async (username, password) => {
    return await prisma.users.findFirst({
        where: {
            username,
            password,
        },
    });
};


const insertUser = async (user) => {
    return await prisma.users.create({
        data: {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
        },
    });
};


const updateUser = async (user, id) => {
    return await prisma.users.update({
        where: { id: parseInt(id) },
        data: {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
        },
    });
};


const deleteUser = async (id) => {
    return await prisma.users.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    selectAllUsers,
    selectUserById,
    validateUserLogin,
    insertUser,
    updateUser,
    deleteUser,
    prisma,
};
