# Informações do Back end 

* Algumas informações importantes estão dispostas no readme da raiz do projeto

## Como rodar:

1. Clone o repositório para sua máquina;
2. Abra o projeto no seu editor de código preferido;
3. Instale as dependências do projeto;
4. Altere o arquivo com as variáveis de ambiente do projeto, presente em backend/src/main/resources/.env.example:

```javascript
  MYSQL_HOST=localhost
  MYSQL_DATABASE=teachgram
  MYSQL_USER=root
  MYSQL_PASSWORD=root
  JWT_SECRET=t34ChGr4N53cr3T
  CORS_FRONTEND=http://localhost:5173
```

- Após alterar, renomeie o arquivo para **.env**

5. Adicione o arquivo .env como fonte de variáveis de ambiente do seu editor
   
6. Rode o projeto;
