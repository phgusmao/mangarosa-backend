# MangaRosa - Backenc

>Projeto separado em __frontend__e__backend__. [backend] (https://github.com/phgusmao/mangarosa-backend) , e [frontend] (https://github.com/phgusmao/mangarosa-frontend)

Layout para registro de usuários.

Tecnologias usadas: TypeScript, MySQL, NestJS e Angular.

*Para rodar o projeto, basta dar um git clone no repositório. 

Após isso, entre na pasta raiz do projeto e instale todas as dependências do projeto com : 
```npm install```

O banco foi utilizado em um container docker com a imagem do MySQL.

Comando para rodar o banco:
```docker run -e MYSQL_ROOT_PASSWORD=root --name mangarosa -p 3306:3306 -d mysql:5.7```

Logo depois, acesse a pasta omando para criar as tabelas database/migrations, e rode o seguinte comando para crias as tabelas:
```npm run migration:run```

Agora é só rodar o projeto:

```npm run start```
