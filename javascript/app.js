
    // Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const produtos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Sistema de Cadastro de Produtos</h1>
        <p>
          Este é um exemplo simples de SPA feita com HTML, CSS e JavaScript.
          A navegação acontece sem recarregar a página.
        </p>

        <p>
          Os produtos cadastrados ficam temporariamente guardados em um array JavaScript.
        </p>

        <div class="contador">
          Produtos cadastrados nesta sessão: <strong>${produtos.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar produto</button>
          <button class="botao secundario" id="btnVerAlunos">Ver produtos</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerAlunos")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Produtos</h1>

        <form id="formProduto">
          <div class="campo">
            <label for="nome">Nome</label>
            <input id="nome" type="text" placeholder="Digite o nome do produto" required />
          </div>

          <div class="campo">
            <label for="preço">Preço</label>
            <input id="preço" type="number" placeholder="Digite o preço do produto" required />
          </div>

          <div class="campo">
            <label for="descrição">Descrição</label>
            <input id="descrição" type="text" placeholder="Digite a descrição do produto" required />
          </div>

          <button class="botao" type="submit">Salvar produto</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formProduto").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const descrição = document.querySelector("#descrição").value.trim();
        const preço = document.querySelector("#preço").value.trim();

        produtos.push({
          nome,
          preço,
          descrição
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Produto cadastrado com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de produtos cadastrados</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de produtos.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (produtos.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum produto cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      produtos.forEach((produto, indice) => {
        linhas += `
          <tr>
            <td>${produto.nome}</td>
            <td>${produto.preço}</td>
            <td>${produto.descrição}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          produtos.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Este exemplo foi criado para demonstrar uma Single Page Application simples.
        </p>
        <p>
          Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
          o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
        </p>
        <p>
          O projeto também demonstra cadastro em array, manipulação do DOM,
          eventos de clique, envio de formulário, listagem e exclusão.
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();