
// ---------- PRODUTOS ----------

var produtos = [
    {
        id: 1,
        nome: "New York",
        preco: 5500.00
    },
    {
        id: 2,
        nome: "Bonito - MT",
        preco: 1559.90
    },
    {
        id: 3,
        nome: "Bolívia",
        preco: 1899.90
    },
    {
        id: 4,
        nome: "Canada",
        preco: 4499.99
    },
    {
        id: 5,
        nome: "Egito",
        preco: 6999.90
    },
    {
        id: 6,
        nome: "Holanda",
        preco: 6249.90
    },
    {
        id: 7,
        nome: "Ilhas Maldivas",
        preco: 8999.90
    },
    {
        id: 8,
        nome: "Paris",
        preco: 5999.90
    },
    {
        id: 9,
        nome: "Suíça",
        preco: 6897.90
    }
];


// ---------- CARRINHO ----------

var carrinho = [];

// ---------- Elementos da pagina ----------

var campoBusca = document.getElementById("campo-busca");
var botaoBusca = document.getElementById("botao-busca");
var listaProdutos = document.getElementById("lista-produtos");
var tituloLista = document.getElementById("titulo-lista");
var mensagemVazia = document.getElementById("mensagem-vazia");

var botaoCarrinho = document.getElementById("botao-carrinho");
var quantidadeCarrinho = document.getElementById("quantidade-carrinho");
var painelCarrinho = document.getElementById("carrinho");
var itensCarrinho = document.getElementById("itens-carrinho");
var carrinhoVazio = document.getElementById("carrinho-vazio");
var valorTotal = document.getElementById("valor-total");
var botaoFinalizar = document.getElementById("botao-finalizar");
var botaoFechar = document.getElementById("botao-fechar");

// ---------- Funcao para formatar o preco ----------

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// ---------- Funcao que mostra os produtos na tela ----------

function mostrarProdutos(lista) {
  listaProdutos.innerHTML = "";

  // se a lista estiver vazia, mostra a mensagem
  if (lista.length === 0) {
    mensagemVazia.classList.remove("escondido");
    return;
  }
