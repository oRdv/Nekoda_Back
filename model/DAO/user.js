/****************************************************************************************
* Objetivo: Arquivo responsável por interagir com a tabela "Users" do banco de dados
* Data: 08/01/2025
* Autor: Tamires Fernandes
****************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const selectAllUsers = async () => {
    try {
        const sql = `
        SELECT 
            id,
            name,
            username,
            email,
            password,
            DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') AS created_at,
            DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') AS updated_at
        FROM 
            Users
        ORDER BY 
            id DESC;
    `;

        return await prisma.$queryRawUnsafe(sql);
    } catch (error) {
        console.error("Erro no selectAllUsers:", error.message);
        return false;
    }
};

const selectUserById = async (id) => {
    try {
        let sql = `
            SELECT id, name, username, email, password, created_at, updated_at
            FROM Users
            WHERE id = ?;
        `;

        // Corrige o envio do parâmetro para o método
        let rsUser = await prisma.$queryRawUnsafe(sql, id);

        // Retorna o usuário encontrado ou null se não existir
        return rsUser.length > 0 ? rsUser[0] : null;
    } catch (error) {
        console.error("Erro no selectUserById:", error.message);
        return false; // Retorna false em caso de erro
    }
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
    try {
        console.log("Inserindo usuário:", user);
        const sql = `
            INSERT INTO Users (name, username, email, password, created_at, updated_at)
            VALUES (
                '${user.name}',
                '${user.username}',
                '${user.email}',
                MD5('${user.password}'),
                NOW(),
                NOW()
            )
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        console.log("Resultado da inserção:", result);

        return result ? true : false;
    } catch (error) {
        console.error("Erro no insertUser:", error.message);
        return false;
    }
};

const selectUserByEmail = async (email) => {
    try {
        const user = await prisma.users.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error("Erro no selectUserByEmail:", error.message);
        return null;
    }
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


const findUserByEmailOrUsername = async (email, username) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username },
                ],
            },
        });
        return user; // Retorna o usuário encontrado ou null se nenhum for encontrado
    } catch (error) {
        console.error("Erro no findUserByEmailOrUsername:", error.message);
        return null;
    }
};

const selectLastUserId = async () => {
    try {
        const sql = `SELECT MAX(id) as lastId FROM Users`;
        const result = await prisma.$queryRawUnsafe(sql);
        console.log("Último ID retornado:", result);

        return result[0]?.lastId || null;
    } catch (error) {
        console.error("Erro no selectLastUserId:", error.message);
        return null;
    }
};


module.exports = {
    selectAllUsers,
    selectUserById,
    validateUserLogin,
    insertUser,
    updateUser,
    deleteUser,
    selectUserByEmail,
    findUserByEmailOrUsername, 
    selectLastUserId,
    prisma,
};
