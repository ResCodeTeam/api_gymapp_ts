Modelo MVC

npm i -> instalar todos os modulos associados à api
src -> pasta com todo o codigo
    - Api -> Codigo da api
        - Models -> Coisas a ver com a base de dados (modelos, orm, etc...) 
        - Routes -> Pasta com as rotas todas existentes para cada role
        - Helpers -> Esquemas e diagramas de ajuda
        - Controllers -> Realização de toda as valiações necessária
        - Validations -> Validação de dados(verificação de tipos etc...) utilizado muito pelos Controllers
        - Middlewares -> utilizado muito para verificação de autenticação com sessões e para refresh de tokens
            como o nome sugere está no meio entre a lógica e o pedido para verificar se tudo está ok
        - Services -> Lógica da api, aqui acontece todo o processo lógico para corresponder ao modelo de negócio
    - Config -> ficheiros de configuração como por exemplo configuração da ligação à base de dados