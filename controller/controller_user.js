/*****************************************************************************************
 * Objetivo: Arquivo responsável pela interação entre o app e a model, incluindo todas
 *           as tratativas e a regra de negócio para o CRUD de usuários.
 * Data: 08/01/2025 - início
 * * Data: 09/01/2025 - fim
 * Autor: Tamires Fernandes
 * Versão: 1.0
 *****************************************************************************************/


const userDAO = require('../model/DAO/user.js');
const message = require('../modulo/config.js');

const getListarUsers = async () => {

    try {
        const users = await userDAO.selectAllUsers();

        if (users && users.length > 0) {
            return {
                status: message.SUCCESS_REQUEST.status,
                status_code: message.SUCCESS_REQUEST.status_code,
                users,
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no getListarUsers:', error.message);
        return message.ERROR_INTERNAL_SERVER;
    }
};


const createUser = async (userData, contentType) => {
    try {
        if (!userData || typeof userData !== "object") {
            console.error("Dados inválidos: userData está vazio ou malformado.");
            return message.ERROR_REQUIRED_FIELDS;
        }

        if (String(contentType).toLowerCase() !== "application/json") {
            return message.ERROR_CONTENT_TYPE;
        }

        const { name, username, email, password } = userData;

        if (!name || !username || !email || !password) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const newUser = await userDAO.insertUser(userData);

        if (newUser) {
            const lastInsertedId = await userDAO.selectLastUserId();
            return {
                status: message.SUCCESS_CREATED_ITEM.status,
                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                user: {
                    id: lastInsertedId,
                    name,
                    username,
                    email,
                },
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


const getUserById = async (id) => {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const user = await userDAO.selectUserById(id);

        if (user) {
            return {
                status: message.SUCCESS_REQUEST.status,
                status_code: message.SUCCESS_REQUEST.status_code,
                user,
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


const updateUser = async (id, userData, contentType) => {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        const { name, username, email, password } = userData;

        if (!name || !username || !email || !password) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const updatedUser = await userDAO.updateUser(id, userData);

        if (updatedUser) {
            return {
                status: message.SUCCESS_UPDATED_ITEM.status,
                status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                user: {
                    id,
                    name,
                    username,
                    email,
                },
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


const deleteUser = async (id) => {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const userExists = await userDAO.selectUserById(id);

        if (!userExists) {
            return message.ERROR_NOT_FOUND;
        }

        const deletedUser = await userDAO.deleteUser(id);

        if (deletedUser) {
            return message.SUCCESS_DELETED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


module.exports = {
    getListarUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
