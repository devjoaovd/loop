```javascript
// ---------- Lista de produtos ----------

var produtos = [
  {
    id: 1,
    nome: "New York",
    preco: 5500.00,
    categoria: "viagens"
  },
  {
    id: 2,
    nome: "Bonito - MT",
    preco: 1559.90,
    categoria: "viagens"
  },
  {
    id: 3,
    nome: "Bolívia",
    preco: 1899.90,
    categoria: "viagens"
  },
  {
    id: 4,
    nome: "Canada",
    preco: 4499.99,
    categoria: "viagens"
  },
  {
    id: 5,
    nome: "Egito",
    preco: 6999.90,
    categoria: "viagens"
  },
  {
    id: 6,
    nome: "Holanda",
    preco: 6249.90,
    categoria: "viagens"
  },
  {
    id: 7,
    nome: "Ilhas Maldivas",
    preco: 8999.90,
    categoria: "viagens"
  },
  {
    id: 8,
    nome: "Paris",
    preco: 5999.90,
    categoria: "viagens"
  },
  {
    id: 9,
    nome: "Suíça",
    preco: 6897.90,
    categoria: "viagens"
  }
];


// ---------- Carrinho ----------

var carrinho = [];


// ---------- Elementos da página ----------

var campoBusca = document.getElementById("campo-busca");
var botaoBusca = document.getElementById("botao-busca");
var listaProdutos = document.getElementById("produtos");
var tituloLista = document.getElementById("titulo-lista");

var botoesAdicionar = document.querySelectorAll(".botao-adicionar");

var botaoCarrinho = document.getElementById("botao-carrinho");
var quantidadeCarrinho = document.getElementById("quantidade-carrinho");

var painelCarrinho = document.getElementById("carrinho");
var itensCarrinho = document.getElementById("itens-carrinho");
var carrinhoVazio = document.getElementById("carrinho-vazio");

var valorTotal = document.getElementById("valor-total");

var botaoFinalizar = document.getElementById("botao-finalizar");
var botaoFechar = document.getElementById("botao-fechar");


// ---------- Formatar preço ----------

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}


// ---------- Procurar produto ----------

function procurarProduto(id) {

  for (var i = 0; i < produtos.length; i++) {

    if (produtos[i].id === id) {
      return produtos[i];
    }

  }

  return null;
}


// ---------- Adicionar ao carrinho ----------

function adicionarAoCarrinho(id) {

  for (var i = 0; i < carrinho.length; i++) {

    if (carrinho[i].id === id) {

      carrinho[i].quantidade++;

      atualizarCarrinho();

      return;
    }

  }


  var produto = procurarProduto(id);


  if (produto === null) {
    return;
  }


  carrinho.push({

    id: produto.id,

    nome: produto.nome,

    preco: produto.preco,

    quantidade: 1

  });


  atualizarCarrinho();

}


// ---------- Remover uma unidade ----------

function removerDoCarrinho(id) {

  for (var i = 0; i < carrinho.length; i++) {

    if (carrinho[i].id === id) {

      if (carrinho[i].quantidade > 1) {

        carrinho[i].quantidade--;

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


    var subtotal = item.preco * item.quantidade;


    total += subtotal;

    quantidadeTotal += item.quantidade;


    var linha = document.createElement("li");


    linha.innerHTML =

      '<span class="item-nome">' +

      item.nome +

      '</span>' +


      '<div class="item-info">' +

      '<span>' +

      item.quantidade +

      " x " +

      formatarPreco(item.preco) +

      '</span>' +


      '<span>' +

      formatarPreco(subtotal) +

      '</span>' +

      '</div>';


    var botaoRemover = document.createElement("button");


    botaoRemover.textContent = "Remover 1";


    botaoRemover.dataset.id = item.id;


    botaoRemover.addEventListener("click", function () {

      var id = Number(this.dataset.id);

      removerDoCarrinho(id);

    });


    linha.querySelector(".item-info").appendChild(botaoRemover);


    itensCarrinho.appendChild(linha);

  }


  // ---------- Carrinho vazio ----------

  if (carrinho.length === 0) {

    carrinhoVazio.classList.remove("escondido");

  } else {

    carrinhoVazio.classList.add("escondido");

  }


  // ---------- Atualizar quantidade ----------

  quantidadeCarrinho.textContent = quantidadeTotal;


  // ---------- Atualizar preço ----------

  valorTotal.textContent = formatarPreco(total);

}


// ---------- Botões "Adicionar ao carrinho" ----------

for (var i = 0; i < botoesAdicionar.length; i++) {

  botoesAdicionar[i].addEventListener("click", function () {

    var id = Number(this.dataset.id);

    adicionarAoCarrinho(id);

  });

}


// ---------- Abrir carrinho ----------

botaoCarrinho.addEventListener("click", function () {

  painelCarrinho.classList.remove("escondido");

});


// ---------- Fechar carrinho ----------

botaoFechar.addEventListener("click", function () {

  painelCarrinho.classList.add("escondido");

});


// ---------- Finalizar compra ----------

botaoFinalizar.addEventListener("click", function () {

  if (carrinho.length === 0) {

    alert("Seu carrinho está vazio!");

    return;

  }


  alert(
    "Compra finalizada!\n\n" +
    "Total: " +
    valorTotal.textContent
  );


  carrinho = [];


  atualizarCarrinho();

});


// ---------- Busca ----------

function buscarProdutos() {

  var texto = campoBusca.value.toLowerCase().trim();


  var cards = listaProdutos.querySelectorAll(".card");


  var encontrados = 0;


  for (var i = 0; i < cards.length; i++) {

    var id = Number(cards[i].dataset.id);


    var produto = procurarProduto(id);


    var nome = produto.nome.toLowerCase();


    var categoria = produto.categoria.toLowerCase();


    if (

      nome.indexOf(texto) !== -1 ||

      categoria.indexOf(texto) !== -1

    ) {

      cards[i].style.display = "";

      encontrados++;

    } else {

      cards[i].style.display = "none";

    }

  }


  if (texto === "") {

    tituloLista.textContent = "Todas as viagens";

  } else {

    tituloLista.textContent =
      "Resultado da busca: " +
      encontrados +
      " produto(s)";

  }

}


// ---------- Botão de busca ----------

botaoBusca.addEventListener("click", buscarProdutos);


// ---------- Busca automática ----------

campoBusca.addEventListener("input", buscarProdutos);


// ---------- Início ----------

atualizarCarrinho();
```
