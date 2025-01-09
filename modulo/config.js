module.exports = {
    SUCCESS_REQUEST: {
        status: true,
        status_code: 200,
        message: "Requisição bem-sucedida.",
    },
    SUCCESS_CREATED_ITEM: {
        status: true,
        status_code: 201,
        message: "Item criado com sucesso.",
    },
    SUCCESS_UPDATED_ITEM: {
        status: true,
        status_code: 200,
        message: "Item atualizado com sucesso.",
    },
    SUCCESS_DELETED_ITEM: {
        status: true,
        status_code: 200,
        message: "Item excluído com sucesso.",
    },
    ERROR_NOT_FOUND: {
        status: false,
        status_code: 404,
        message: "Recurso não encontrado.",
    },
    ERROR_INVALID_ID: {
        status: false,
        status_code: 400,
        message: "ID inválido.",
    },
    ERROR_REQUIRED_FIELDS: {
        status: false,
        status_code: 400,
        message: "Campos obrigatórios não preenchidos.",
    },
    ERROR_CONTENT_TYPE: {
        status: false,
        status_code: 415,
        message: "Tipo de conteúdo inválido.",
    },
    ERROR_INTERNAL_SERVER: {
        status: false,
        status_code: 500,
        message: "Erro interno do servidor.",
    },
    ERROR_INTERNAL_SERVER_DBA: {
        status: false,
        status_code: 500,
        message: "Erro interno na base de dados.",
    },
};
