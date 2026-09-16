// ---------- Lista de produtos da loja ----------

var produtos = [
  { id: 1, nome: "New York", descricao: "Viagem para a cidade de New York - EUA.\nCom duração de 10 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 5500.00, imagem: "img/newyork.png" },

  { id: 2, nome: "Bonito - MT", descricao: "Viagem para a cidade de Bonito - MT.\nCom duração de 5 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 1559.90, imagem: "img/bonito.png" },

  { id: 3, nome: "Bolívia", descricao: "Viagem para o país de Bolívia.\nCom duração de 7 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 1899.90, imagem: "img/bolivia.png" },

  { id: 4, nome: "Canada", descricao: "Viagem para o país de Canada.\nCom duração de 5 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 4499.99, imagem: "img/canada.png" },

  { id: 5, nome: "Egito", descricao: "Viagem para o país de Egito.\nCom duração de 5 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 6999.90, imagem: "img/egito.png" },

  { id: 6, nome: "Holanda", descricao: "Viagem para o país de Holanda.\nCom duração de 5 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 6249.90, imagem: "img/holanda.png" },

  { id: 7, nome: "Ilhas Maldivas", descricao: "Viagem para as ilhas Maldivas.\nCom duração de 7 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 8999.90, imagem: "img/maldivas.png" },

  { id: 8, nome: "Paris", descricao: "Viagem para a cidade de Paris.\nCom duração de 5 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 5999.90, imagem: "img/paris.png" },

  { id: 9, nome: "Suíça", descricao: "Viagem para a cidade de Suíça.\nCom duração de 5 dias.\nPassagens de ida e volta.", categoria: "viagens", preco: 6897.90, imagem: "img/suica.png" }
];


// ---------- Carrinho começa vazio ----------

var carrinho = [];


// ---------- Elementos da página ----------

var campoBusca = document.getElementById("campo-busca");
var botaoBusca = document.getElementById("botao-busca");

var listaProdutos = document.getElementById("produtos");
var tituloLista = document.getElementById("titulo-lista");

var botaoCarrinho = document.getElementById("botao-carrinho");
var quantidadeCarrinho = document.getElementById("quantidade-carrinho");

var painelCarrinho = document.getElementById("carrinho");
var itensCarrinho = document.getElementById("itens-carrinho");
var carrinhoVazio = document.getElementById("carrinho-vazio");
var valorTotal = document.getElementById("valor-total");

var botaoFinalizar = document.getElementById("botao-finalizar");
var botaoFechar = document.getElementById("botao-fechar");


// ---------- Função para formatar o preço ----------

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}


// ---------- Função que mostra os produtos na tela ----------

function mostrarProdutos(lista) {

  listaProdutos.innerHTML = "";

  // percorre a lista e cria um cartão para cada produto
  for (var i = 0; i < lista.length; i++) {

    var produto = lista[i];

    var cartao = document.createElement("div");

    // usa a mesma classe do CSS
    cartao.className = "card";

    cartao.innerHTML =
      '<img src="' + produto.imagem + '" alt="' + produto.nome + '">' +

      '<div class="card-info">' +

      '<h2>' + produto.nome + '</h2>' +

      '<p>' + produto.descricao.replace(/\n/g, "<br>") + '</p>' +

      '<h3>' + formatarPreco(produto.preco) + '</h3>' +

      '</div>';

    // cria o botão
    var botao = document.createElement("button");

    botao.textContent = "Adicionar ao carrinho";

    // guarda o id do produto no botão
    botao.dataset.id = produto.id;

    botao.addEventListener("click", function () {
      adicionarAoCarrinho(Number(this.dataset.id));
    });

    cartao.appendChild(botao);

    listaProdutos.appendChild(cartao);
  }
}


// ---------- Função da barra de busca ----------

function buscarProdutos() {

  var texto = campoBusca.value.toLowerCase();

  var encontrados = [];

  // percorre todos os produtos
  for (var i = 0; i < produtos.length; i++) {

    var nome = produtos[i].nome.toLowerCase();
    var categoria = produtos[i].categoria.toLowerCase();

    if (
      nome.indexOf(texto) !== -1 ||
      categoria.indexOf(texto) !== -1
    ) {
      encontrados.push(produtos[i]);
    }
  }

  if (texto === "") {

    tituloLista.textContent = "Todas as viagens";

  } else {

    tituloLista.textContent =
      "Resultado da busca: " +
      encontrados.length +
      " produto(s)";
  }

  mostrarProdutos(encontrados);
}


// ---------- Função que procura um produto pelo ID ----------

function procurarProduto(id) {

  for (var i = 0; i < produtos.length; i++) {

    if (produtos[i].id === id) {
      return produtos[i];
    }
  }

  return null;
}


// ---------- Funções do carrinho ----------

function adicionarAoCarrinho(id) {

  // verifica se o produto já está no carrinho
  for (var i = 0; i < carrinho.length; i++) {

    if (carrinho[i].id === id) {

      carrinho[i].quantidade =
        carrinho[i].quantidade + 1;

      atualizarCarrinho();

      return;
    }
  }

  // procura o produto
  var produto = procurarProduto(id);

  // adiciona ao carrinho
  carrinho.push({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1
  });

  atualizarCarrinho();
}


// ---------- Remover produto do carrinho ----------

function removerDoCarrinho(id) {

  for (var i = 0; i < carrinho.length; i++) {

    if (carrinho[i].id === id) {

      if (carrinho[i].quantidade > 1) {

        carrinho[i].quantidade =
          carrinho[i].quantidade - 1;

      } else {

        carrinho.splice(i, 1);
      }

      break;
    }
  }

  atualizarCarrinho();
}


// ---------- Atualizar carrinho ----------

function atualizarCarrinho() {

  itensCarrinho.innerHTML = "";

  var total = 0;
  var quantidadeTotal = 0;

  for (var i = 0; i < carrinho.length; i++) {

    var item = carrinho[i];

    var subtotal =
      item.preco * item.quantidade;

    total = total + subtotal;

    quantidadeTotal =
      quantidadeTotal + item.quantidade;


    var linha = document.createElement("li");

    linha.innerHTML =
      '<span class="item-nome">' +
      item.nome +
      '</span>' +

      '<div class="item-info">' +

      '<span>' +
      item.quantidade +
      ' x ' +
      formatarPreco(item.preco) +
      '</span>' +

      '<span>' +
      formatarPreco(subtotal) +
      '</span>' +

      '</div>';


    var botaoRemover =
      document.createElement("button");

    botaoRemover.textContent = "Remover 1";

    botaoRemover.dataset.id = item.id;

    botaoRemover.addEventListener("click", function () {

      removerDoCarrinho(
        Number(this.dataset.id)
      );

    });


    linha
      .querySelector(".item-info")
      .appendChild(botaoRemover);

    itensCarrinho.appendChild(linha);
  }


  // mostra ou esconde a mensagem de carrinho vazio
  if (carrinho.length === 0) {

    carrinhoVazio.classList.remove("escondido");

  } else {

    carrinhoVazio.classList.add("escondido");
  }


  // atualiza quantidade e valor
  quantidadeCarrinho.textContent =
    quantidadeTotal;

  valorTotal.textContent =
    formatarPreco(total);
}


// ---------- Finalizar compra ----------

function finalizarCompra() {

  if (carrinho.length === 0) {

    alert("Seu carrinho está vazio!");

    return;
  }

  alert(
    "Compra finalizada! Total: " +
    valorTotal.textContent
  );

  carrinho = [];

  atualizarCarrinho();
}


// ---------- Ligando os botões às funções ----------

botaoBusca.addEventListener(
  "click",
  buscarProdutos
);

campoBusca.addEventListener(
  "input",
  buscarProdutos
);


botaoCarrinho.addEventListener(
  "click",
  function () {

    painelCarrinho.classList.remove(
      "escondido"
    );

  }
);


botaoFechar.addEventListener(
  "click",
  function () {

    painelCarrinho.classList.add(
      "escondido"
    );

  }
);


botaoFinalizar.addEventListener(
  "click",
  finalizarCompra
);


// ---------- Início do programa ----------

mostrarProdutos(produtos);

atualizarCarrinho();