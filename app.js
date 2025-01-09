const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importando os controllers
const controllerUsers = require('./controller/controller_user');
const controllerPosts = require('./controller/controller_post');

const app = express();

// Configuração de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

// Configurando body-parser para JSON
app.use(express.json());
app.use(cors());
const bodyParserJson = bodyParser.json();

//USERs
app.get('/v1/nekoda/users', cors(), async (request, response, next) => {

    let dadosUser = await controllerUsers.getListarUsers()

    response.status(dadosUser.status_code)
    response.json(dadosUser)
})


app.get('/v1/nekoda/users/:id', cors(), async (req, res) => {
    const userId = req.params.id;
    const user = await controllerUsers.getBuscarUser(userId);

    res.status(user.status_code).json(user);
});

app.post('/v1/nekoda/users', cors(), bodyParserJson, async (request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    try {
        let resultDados = await controllerUsers.createUser(dadosBody, contentType);

        if (!resultDados || !resultDados.status_code) {
            return response.status(500).json({
                status: "Error",
                status_code: 500,
                message: "Erro interno no servidor. Resposta inválida do controller.",
            });
        }

        response.status(resultDados.status_code);
        response.json(resultDados);
    } catch (error) {
        console.error("Erro no endpoint /v1/nekoda/users:", error);
        response.status(500).json({
            status: "Error",
            status_code: 500,
            message: "Erro interno no servidor.",
        });
    }
});

app.put('/v1/nekoda/users/:id', cors(), bodyParserJson, async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    const contentType = req.headers['content-type'];
    const result = await controllerUsers.setAtualizarUser(updatedUser, contentType, userId);

    res.status(result.status_code).json(result);
});

app.delete('/v1/nekoda/users/:id', cors(), async (req, res) => {
    const userId = req.params.id;
    const result = await controllerUsers.setExcluirUser(userId);

    res.status(result.status_code).json(result);
});

// POSTS
app.get('/v1/nekoda/posts', cors(), async (req, res) => {
    try {
        const posts = await controllerPosts.getListarPosts();
        res.status(posts.status_code).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.get('/v1/nekoda/posts/:id', cors(), async (req, res) => {
    const postId = req.params.id;
    const post = await controllerPosts.getBuscarPost(postId);

    res.status(post.status_code).json(post);
});

app.post('/v1/nekoda/posts', cors(), bodyParserJson, async (req, res) => {
    try {
        const newPost = req.body;
        const contentType = req.headers['content-type'];
        const result = await controllerPosts.setNovoPost(newPost, contentType);

        if (!result || !result.status_code) {
            return res.status(500).json({
                status: "Error",
                status_code: 500,
                message: "Erro interno no servidor. Resposta inválida do controller.",
            });
        }

        res.status(result.status_code).json(result);
    } catch (error) {
        console.error("Erro no endpoint /v1/nekoda/posts:", error);
        res.status(500).json({
            status: "Error",
            status_code: 500,
            message: "Erro interno no servidor.",
        });
    }
});


app.put('/v1/nekoda/posts/:id', cors(), bodyParserJson, async (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    const contentType = req.headers['content-type'];
    const result = await controllerPosts.setAtualizarPost(updatedPost, contentType, postId);

    res.status(result.status_code).json(result);
});

app.delete('/v1/nekoda/posts/:id', cors(), async (req, res) => {
    const postId = req.params.id;
    const result = await controllerPosts.setExcluirPost(postId);

    res.status(result.status_code).json(result);
});

// iniciando
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`A API está no ar e aguardando requisições na porta ${PORT}`);
});
