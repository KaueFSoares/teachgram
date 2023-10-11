# Informações do Front end 

* Algumas informações importantes estão dispostas no readme da raiz do projeto

## Como rodar:

1. Clone o repositório para sua máquina;

2. Entre na pasta do projeto;
```javascript
   cd front
```

3. Instale as dependências do projeto:
```javascript
   npm install
```
ou 
```javascript
  yarn
```

4. Suba o servidor - caso opte por rodar o servidor localmente, siga as instruções na pasta destinada ao back-end - ou use o servidor que já está no ar em [teachgram-api.up.railway.app](https://teachgram-api.up.railway.app), mas me comunique para que libere o cors para a url local, uma vez que no momento ele está aceitando apenas a url que está no ar ([teachgram.kauesoares.website](https://teachgram.kauesoares.website))

5. Configure as variáveis de ambiente:

- edite o arquivo .env.example, na raiz do projeto, adicionando a url do servidor e depois renomeie o arquivo para apenas **.env**:

```javascript
   VITE_API_URL=https://teachgram-api.up.railway.app
```
ou 
```javascript
  VITE_API_URL=http://localhost:8080
```

6. Rode o projeto, se certificando de que a porta 5173 esteja disponível para não ter problemas com CORS:

```javascript
   npm run dev
```
ou 
```javascript
  yarn run dev
```

7. Por fim, caso deseje apenas testar funcionalidades do projeto, lembre-se que ele está no ar em [teachgram.kauesoares.website](https://teachgram.kauesoares.website)
