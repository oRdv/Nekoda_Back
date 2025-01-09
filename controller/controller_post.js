/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de posts
* Data: 08/01/2025 - inicio
* Data: 09/01/2025 - fim
* Autor: Tamires fernandes
* Versão: 1.0
***************************************************************************************/

const postDAO = require('../model/DAO/POST.JS');
const userDAO = require('../model/DAO/user.js');

const message = require('../modulo/config.js');


const getListarPosts = async () => {
    try {
        let posts = await postDAO.selectAllPosts();
        let resultPosts = {};

        if (posts && posts.length > 0) {
            resultPosts.status_code = 200;
            resultPosts.qt = posts.length;
            resultPosts.posts = posts;
            return resultPosts;
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};


const setNovoPost = async (dadosPost, contentType) => {
    try {
        // Validações
        if (String(contentType).toLowerCase() !== 'application/json') {
            return { status_code: 415, message: "Content-Type inválido." };
        }

        if (!dadosPost.title || !dadosPost.body || !dadosPost.user_id) {
            return { status_code: 400, message: "Campos obrigatórios não preenchidos." };
        }

        const novoPost = await postDAO.insertPost(dadosPost);

        if (novoPost) {
            return {
                status_code: 201,
                message: "Post criado com sucesso.",
                post: novoPost,
            };
        } else {
            return { status_code: 500, message: "Erro ao criar post." };
        }
    } catch (error) {
        console.error("Erro em setNovoPost:", error);
        return { status_code: 500, message: "Erro interno no servidor." };
    }
};



const getBuscarPost = async (id) => {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID; // 400
        }

        let post = await postDAO.selectPostById(id);

        if (post) {
            return { status_code: 200, post };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};


const setAtualizarPost = async (dadosPost, contentType, id) => {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE; // 415
        }

        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID; // 400
        }

        // Verifica se o post existe
        const postExistente = await postDAO.selectPostById(id);
        if (!postExistente) {
            return message.ERROR_NOT_FOUND; // 404
        }

        // Validação do autor
        const valAutor = await userDAO.selectUserById(dadosPost.user_id);
        if (
            !dadosPost.title || dadosPost.title.length > 255 || // Verifica título
            !dadosPost.body ||                                 // Verifica corpo
            !dadosPost.user_id || !valAutor                    // Verifica autor
        ) {
            return message.ERROR_REQUIRED_FIELDS; // 400
        }

        // Atualiza o post
        const postAtualizado = await postDAO.updatePost(dadosPost, id);

        if (postAtualizado) {
            return {
                status: message.SUCCESS_UPDATED_ITEM.status,
                status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                message: message.SUCCESS_UPDATED_ITEM.message,
                post: postAtualizado,
            }; // 200
        } else {
            return message.ERROR_INTERNAL_SERVER; // 500
        }
    } catch (error) {
        console.error('Erro em setAtualizarPost:', error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};


const setExcluirPost = async (id) => {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID; // 400
        }

        let postExcluido = await postDAO.deletePost(id);

        if (postExcluido) {
            return message.SUCCESS_DELETED_ITEM; // 200
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

module.exports = {
    getListarPosts,
    setNovoPost,
    getBuscarPost,
    setAtualizarPost,
    setExcluirPost
};
