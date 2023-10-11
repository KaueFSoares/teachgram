# teachgram

Olá, caro amigo(a) da 3035 Tech, tudo bem?

Informações específicas sobre o back ou front end, como fazer para rodar localmente, podem ser encontradas nos seus respectivos readme's

Aqui vai uma listagem rápida do que consegui ou não fazer do que foi solicitado na instrução do projeto e alguns diferenciais dele:

### Implementação de refresh token:
- Ao fazer login, o usuário recebe o access token e o refresh token, para quando o access token tiver expirado. No back end, fazer um request para /auth/refresh com um token válido retorna um novo par de tokens. No front ent, usei um interceptor do Axios para verificar a validade do token e fazer o refresh caso necessário antes de cada request;

### Deploys:
- Para facilitar a vida de quem vai avaliar o front end principalmente e para testes em diferentes aparelhos, fiz deploy de toda a aplicação, contando com uma instância MYSQL hospedada na AWS, a aplicação em Spring Boot rodando no Railway e a aplicação React rodando no Netlify. Se quiser conferir, o link é [teachgram.kauesoares.website](https://teachgram.kauesoares.website);

### Documentação dos end points:
- Também para facilitar a vida dos desenvolvedores, utilizei o Swagger UI para documentação dos end points, com a relação dos parâmetros e métodos de cada rota, você pode consultar no [link](https://teachgram-api.up.railway.app/swagger-ui/index.html#/auth-controller/login);
  
### Suporte a internacionalização:
- A fim de aproximar do que é uma rede social de fato, implementei o suporte a internacionalização, tanto no front-end quanto no back-end, através das implementações da i18n. No momento a aplicação conta com apenas dois idiomas que podem ser trocados nas configurações, mas a adição de mais idiomas é simples e rápida;

### Autenticação com Google e Apple:
- Não consegui fazer a parte de autenticação usando as api's do google e apple. Cheguei conseguir implementar a autenticação com o google no front-end mas recebi a mensagem de que a forma que usei estava descontinuada e não era recomendada, e não consegui encontrar conteúdo o bastante para implementar no tempo que tivemos :/ .
