# 🐱 Nekoda Backend

Bem-vindo ao backend do projeto **Nekoda**! 🎉 Este repositório é responsável por gerenciar a lógica do servidor e as operações com o banco de dados para o sistema. Com a ajuda do [Prisma](https://www.prisma.io/), configuramos um ambiente robusto e fácil de usar para lidar com dados.

Siga os passos abaixo para configurar e rodar tudo direitinho. Vamos lá? 😉

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter as ferramentas abaixo instaladas:

- **Node.js** (v16 ou superior/nesse é utilizado o node 22 versao LTS, talvez não funcione em outras versões) 🌳  
- **MySQL** (v8.0) 🐬  
- **NPM** (gerenciador de pacotes do Node.js) 📦  

---

## 🔧 Configuração

1. **Clone o repositório**  
   Primeiro, clone este projeto na sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/nekoda-backend.git
   cd nekoda-backend
   ```

2. **Instale as dependências**  
   Rode o seguinte comando para instalar as dependências necessárias:

   ```bash
   npm install
   ```

3. **Banco de dados**  
   - Dentro da pasta `database` deste repositório, você encontrará o arquivo de dump do banco de dados.  
   - Importe esse arquivo para o MySQL 8.0.
   - E rode o script em ordem.

    
4. **Configuração do arquivo `.env`**  
   No diretório principal, existe um arquivo `.env`. Verifique se a chave de conexão com o banco (`DATABASE_URL`) está correta. Caso seja necessário, altere-a para a sua configuração local.

   Exemplo de configuração:

   ```
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nekoda"
   ```

---

## 🚀 Como rodar o servidor

1. Certifique-se de que o MySQL está rodando e o banco foi configurado corretamente. ✅  
2. Agora, inicie o servidor com o comando no terminal:  

   ```bash
   node app.js
   ```

3. Pronto! 🎉 O backend estará rodando localmente na porta padrão.  

---

## 🌐 Integração com o Frontend

Para testar o sistema completo, é necessário também rodar o frontend. Você pode encontrar o repositório correspondente aqui: [Nekoda Frontend](https://github.com/oRdv/Nekoda).  

Basta seguir as instruções no frontend e garantir que o backend está rodando ao mesmo tempo.

---

## 🤔 Dúvidas ou problemas?

Caso encontre algum problema, verifique se:  
- O MySQL está configurado corretamente.  
- O arquivo `.env` está apontando para o banco certo.  
- Todas as dependências foram instaladas com `npm install`.
- Ou me mande uma mensagem no Linkedin que está no meu perfil.

---

## ✨ Sobre o projeto

Nekoda é um sistema projetado para gerenciar posts e interações entre usuários. Este backend foi desenvolvido com foco em escalabilidade, utilizando o Prisma como ORM para facilitar o trabalho com o banco de dados.  

