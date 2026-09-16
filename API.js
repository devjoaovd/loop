
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


// ---------- ELEMENTOS ----------

var botoesAdicionar =
    document.querySelectorAll(".botao-adicionar");

var botaoCarrinho =
    document.getElementById("botao-carrinho");

var quantidadeCarrinho =
    document.getElementById("quantidade-carrinho");

var painelCarrinho =
    document.getElementById("carrinho");

var itensCarrinho =
    document.getElementById("itens-carrinho");

var carrinhoVazio =
    document.getElementById("carrinho-vazio");

var valorTotal =
    document.getElementById("valor-total");

var botaoFinalizar =
    document.getElementById("botao-finalizar");

var botaoFechar =
    document.getElementById("botao-fechar");


// ---------- FORMATAR PREÇO ----------

function formatarPreco(valor) {

    return "R$ " +
        valor.toFixed(2).replace(".", ",");

}


// ---------- PROCURAR PRODUTO ----------

function procurarProduto(id) {

    for (var i = 0; i < produtos.length; i++) {

        if (produtos[i].id === id) {

            return produtos[i];

        }

    }

    return null;
}


// ---------- ADICIONAR AO CARRINHO ----------

function adicionarAoCarrinho(id) {

    var produto =
        procurarProduto(id);

    if (produto === null) {

        return;

    }


    // Verifica se o produto já está no carrinho

    for (var i = 0; i < carrinho.length; i++) {

        if (carrinho[i].id === id) {

            carrinho[i].quantidade++;

            atualizarCarrinho();

            return;

        }

    }


    // Adiciona um novo produto

    carrinho.push({

        id: produto.id,

        nome: produto.nome,

        preco: produto.preco,

        quantidade: 1

    });


    atualizarCarrinho();

}


// ---------- REMOVER PRODUTO ----------

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


// ---------- ATUALIZAR CARRINHO ----------

function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";


    var quantidadeTotal = 0;

    var total = 0;


    // Verifica todos os produtos

    for (var i = 0; i < carrinho.length; i++) {

        var item = carrinho[i];


        quantidadeTotal +=
            item.quantidade;


        total +=
            item.preco * item.quantidade;


        // Cria o item

        var li =
            document.createElement("li");


        li.className = "item-carrinho";


        // Nome do produto

        var nome =
            document.createElement("strong");

        nome.textContent =
            item.nome;


        // Quantidade

        var quantidade =
            document.createElement("span");

        quantidade.textContent =
            "Quantidade: " +
            item.quantidade;


        // Preço

        var preco =
            document.createElement("span");

        preco.textContent =
            formatarPreco(
                item.preco * item.quantidade
            );


        // Botão remover

        var botaoRemover =
            document.createElement("button");

        botaoRemover.textContent =
            "Remover 1";

        botaoRemover.className =
            "botao-remover";


        // Guarda o ID correto

        (function (idProduto) {

            botaoRemover.addEventListener(
                "click",
                function () {

                    removerDoCarrinho(idProduto);

                }
            );

        })(item.id);


        // Monta o item

        li.appendChild(nome);

        li.appendChild(quantidade);

        li.appendChild(preco);

        li.appendChild(botaoRemover);


        itensCarrinho.appendChild(li);

    }


    // ---------- CARRINHO VAZIO ----------

    if (carrinho.length === 0) {

        carrinhoVazio.style.display =
            "block";

    } else {

        carrinhoVazio.style.display =
            "none";

    }


    // ---------- ATUALIZA QUANTIDADE ----------

    quantidadeCarrinho.textContent =
        quantidadeTotal;


    // ---------- ATUALIZA TOTAL ----------

    valorTotal.textContent =
        formatarPreco(total);

}


// ---------- BOTÕES ADICIONAR ----------

for (var i = 0; i < botoesAdicionar.length; i++) {

    botoesAdicionar[i].addEventListener(
        "click",
        function () {

            var id =
                Number(
                    this.getAttribute("data-id")
                );


            adicionarAoCarrinho(id);

        }
    );

}


// ---------- ABRIR CARRINHO ----------

botaoCarrinho.addEventListener(
    "click",
    function () {

        painelCarrinho.classList.remove(
            "escondido"
        );

    }
);


// ---------- FECHAR CARRINHO ----------

botaoFechar.addEventListener(
    "click",
    function () {

        painelCarrinho.classList.add(
            "escondido"
        );

    }
);


// ---------- FINALIZAR COMPRA ----------

botaoFinalizar.addEventListener(
    "click",
    function () {

        // Não permite finalizar vazio

        if (carrinho.length === 0) {

            alert(
                "Seu carrinho está vazio!"
            );

            return;

        }


        // Notificação de compra concluída

        alert(
            "Compra concluída com sucesso!!\n\n" +
            "Boa viagem!!"
        );


        // Limpa o carrinho

        carrinho = [];


        // Atualiza a tela

        atualizarCarrinho();


        // Fecha o carrinho

        painelCarrinho.classList.add(
            "escondido"
        );

    }
);


// ---------- INICIAR ----------

atualizarCarrinho();

