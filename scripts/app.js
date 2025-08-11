const formulario = document.getElementById("form");

const itensLi = document.querySelectorAll(".item");
const overlay = document.querySelector(".overlay");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    criaCampoServico();
    limpaCampo();
});

itensLi.forEach((botao) => {
    botao.addEventListener("click", () => {
        itensLi.forEach((btn) => btn.classList.remove("active"));
        botao.classList.add("active");
    });
});

const modal = document.querySelector(".modal-filtrar");

// modal para filtrar
const showModal = () => {
        // remove outros modais primeiro
    if (relatorio.classList.contains("show-relatorio")) {
        relatorio.classList.remove("show-relatorio");
      
    }
    modal.classList.toggle("show-modal");
};

const relatorio = document.querySelector(".relatorio");
const showRelatorio = () => {
    // remove outros modais primeiro
    if (modal.classList.contains("show-modal")) {
        modal.classList.remove("show-modal");
    }

    relatorio.classList.toggle("show-relatorio");
   
};

const removeModal = () => {
    relatorio.classList.remove("show-relatorio");
    modal.classList.remove("show-modal");
};

// *******************************************************************************
const servico = document.querySelector(".servico");
const dataServico = document.querySelector(".data-servico");
const valorServico = document.querySelector(".valor-servico");
const formaPagamento = document.getElementById("forma-pagamento");
const botaoAdicionar = document.querySelector(".btn-add");
const btnCancelar = document.querySelector(".btn-cancelar");

btnCancelar.addEventListener("click", () => {
    limpaCampo();
});
const mensagem = document.querySelector(".mensagem-sucesso");
const campoSaldo = document.querySelector(".saldo");
let saldoTotal = 0;
const criaCampoServico = () => {
    const tipoServico = servico.value.trim();
    const data = dataServico.value.trim();
    const valor = parseFloat(valorServico.value.trim());
    const formaPag = formaPagamento.value.trim();
    const containerVendas = document.querySelector(".vendas");

    containerVendas.innerHTML += ` <div class="venda">
                        <p>${tipoServico}</p>
                        <p>${data}</p>
                        <p>R$ ${valor}</p>
                        <p class="forma-pag">${formaPag}</p>
                    </div>`;
    saldoTotal += valor;
    campoSaldo.textContent = `Total R$ ${saldoTotal}`;
    mensagem.textContent = "Serviço cadastrado com sucesso";
    setTimeout(() => {
        mensagem.textContent = "";
    }, 2000);
};

const limpaCampo = () => {
    servico.value = "";
    valorServico.value = "";
    formaPagamento.value = "";
    dataServico.value = "";
};
