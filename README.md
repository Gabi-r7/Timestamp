# Trabalho_Programacao

### Passo a Passo de Execução

**1. Clonar o Repositório:**
   Primeiro, você precisa clonar o repositório para o seu ambiente local.
   ```sh
   git clone https://github.com/Gabi-r7/Trabalho_Programacao.git
   cd Trabalho_Programacao
   ```

**2. Instalar Dependências:**
   Instale as dependências do projeto usando npm.
   ```sh
   npm install
   ```

**3. Iniciar o Servidor:**
   Inicie o servidor Node.js.
   ```sh
   npm run start
   ```
   Isso vai iniciar o servidor na porta 3000.

**4. Acessar a Aplicação:**
   Abra o navegador e acesse a URL:
   ```
   http://localhost:3000
   ```
   Isso carregará a página principal da aplicação que serve o arquivo `index.html`.

**5. Utilizar a API:**
   - **Converter Data:**
     Para converter uma data, você pode fazer uma requisição GET para a API:
     ```
     http://localhost:3000/api/{date}?fuso={fuso}
     ```
     Onde `{date}` é a data que você quer converter e `{fuso}` é o fuso horário (opcional).

   - **Calcular Diferença entre Datas:**
     Para calcular a diferença entre duas datas, você pode fazer uma requisição POST para a API:
     ```sh
     curl -X POST "http://localhost:3000/api/diff/{date1}/{date2}"
     ```
     Onde `{date1}` e `{date2}` são as datas que você quer comparar.

Seguindo estes passos, você será capaz de executar e interagir com o projeto "Trabalho_Programacao" localmente.