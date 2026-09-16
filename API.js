
// ---------- Lista de produtos ----------

var produtos = [
  { id: 1, nome: "New York", preco: 5500.00, categoria: "viagens" },
  { id: 2, nome: "Bonito - MT", preco: 1559.90, categoria: "viagens" },
  { id: 3, nome: "Bolívia", preco: 1899.90, categoria: "viagens" },
  { id: 4, nome: "Canada", preco: 4499.99, categoria: "viagens" },
  { id: 5, nome: "Egito", preco: 6999.90, categoria: "viagens" },
  { id: 6, nome: "Holanda", preco: 6249.90, categoria: "viagens" },
  { id: 7, nome: "Ilhas Maldivas", preco: 8999.90, categoria: "viagens" },
  { id: 8, nome: "Paris", preco: 5999.90, categoria: "viagens" },
  { id: 9, nome: "Suíça", preco: 6897.90, categoria: "viagens" }
];


// ---------- Carrinho ----------

var carrinho = [];


// ---------- Elementos ----------

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


// ---------- Adicionar produto ----------

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


// ---------- Remover produto ----------

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


    var nome = document.createElement("span");

    nome.className = "item-nome";
    nome.textContent = item.nome;


    var informacoes = document.createElement("div");

    informacoes.className = "item-info";


    var quantidade = document.createElement("span");

    quantidade.textContent =
      item.quantidade +
      " x " +
      formatarPreco(item.preco);


    var subtotalTexto = document.createElement("span");

    subtotalTexto.textContent =
      formatarPreco(subtotal);


    var botaoRemover = document.createElement("button");

    botaoRemover.textContent = "Remover 1";


    botaoRemover.addEventListener("click", function () {

      removerDoCarrinho(item.id);

    });


    informacoes.appendChild(quantidade);
    informacoes.appendChild(subtotalTexto);
    informacoes.appendChild(botaoRemover);


    linha.appendChild(nome);
    linha.appendChild(informacoes);


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


  // ---------- Atualizar total ----------

  valorTotal.textContent = formatarPreco(total);
}


// ---------- Botões adicionar ----------

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


// ---------- Iniciar ----------

atualizarCarrinho();

