const formulario = document.getElementById("form");

const itensLi = document.querySelectorAll(".item");
const overlay = document.querySelector(".overlay");
const relatorio = document.querySelector(".relatorio");

const botaoAdicionar = document.querySelector(".btn-add");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    criaRelatorio();
    limpaCampo();
    definirDataAtualComoPadrao();
});

const modal = document.querySelector(".modal-filtrar");
itensLi.forEach((botao) => {
    botao.addEventListener("click", () => {
        itensLi.forEach((btn) => btn.classList.remove("active"));
        botao.classList.add("active");
    });
});

// modal para filtrar
const showModal = () => {
    // remove outros modais primeiro
    if (relatorio.classList.contains("show-relatorio")) {
        relatorio.classList.remove("show-relatorio");
    }
    modal.classList.toggle("show-modal");
};

const showRelatorio = () => {
    // remove outros modais primeiro
    if (modal.classList.contains("show-modal")) {
        modal.classList.remove("show-modal");
    }

    relatorio.classList.toggle("show-relatorio");
};

const liHome = document.querySelector(".li-home");
const removeModal = () => {
    relatorio.classList.remove("show-relatorio");
    modal.classList.remove("show-modal");

    // desativa a li quando o modal fecha
    itensLi.forEach((btn) => {
        btn.classList.remove("active");
        liHome.classList.add("active");
    });
};

// *******************************************************************************
const servico = document.querySelector(".servico");
const dataServico = document.querySelector(".data-servico");
const valorServico = document.querySelector(".valor-servico");
const formaPagamento = document.getElementById("forma-pagamento");
const btnCancelar = document.querySelector(".btn-cancelar");

let listaServicos = [];
btnCancelar.addEventListener("click", () => {
    limpaCampo();
});

// Utilitário para formatar data (de ISO para BR)
const formatarDataParaExibicao = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
};

const definirDataAtualComoPadrao = () => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    const dataFormatadaParaInput = hoje.toISOString().split("T")[0];
    dataServico.value = dataFormatadaParaInput;
};

definirDataAtualComoPadrao();

const campoSaldo = document.querySelector(".saldo_saldo");
let saldoTotal = 0;

const criaRelatorio = () => {
    const tipoServico = servico.value.trim();
    const data = dataServico.value.trim();
    const valor = parseFloat(valorServico.value.trim());
    const formaPag = formaPagamento.value.trim();

    novoServico = {
        id: new Date().getTime(),
        tipo: tipoServico,
        valor: valor,
        data: data,
        forma: formaPag,
    };

   
    listaServicos.push(novoServico);

    saldoTotal += valor;
    campoSaldo.textContent = `Total ${saldoTotal.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    })}`;

    
        renderizaServico(novoServico);
        definirDataAtualComoPadrao();
};

// salva no localStorage
const salvaServicoStorage = () => {
    localStorage.setItem("servicos", JSON.stringify(listaServicos));
};

// carrega dados do storage ao carregar a página
const carregaDados = () => {
    const dados = localStorage.getItem("servicos");

    if (dados) {
        listaServicos = JSON.parse(dados);
        listaServicos.forEach((servico) => {
            renderizaServico(servico);
        });
    }
};


let containerVendas = document.querySelector(".vendas");
const campoFedback = document.querySelector(".containerFedbackSucesso");

const renderizaServico = (servico) => {
    const dataFormatada = formatarDataParaExibicao(servico.data);

    

    containerVendas.innerHTML += `<div class="venda">
                        <p>${servico.tipo}</p>
                        <p>${dataFormatada}</p>
                         <p>${servico.valor.toLocaleString("pt-br", {
                             style: "currency",
                             currency: "BRL",
                         })}</p>
                        <p class="forma-pag">${servico.forma}</p>
                    </div>`;

    // mostra um card com o serviço cadastrado
    campoFedback.innerHTML = ` <p class="mensagem-sucesso"></p>
                <div class="sucesso">
                    <p>Modelo: <span>${servico.tipo}</span></p>
                    <p>Data: <span>${dataFormatada}</span></p>
                        <p>Valor R$: <span>${servico.valor.toLocaleString(
                            "pt-br",
                            {
                                style: "currency",
                                currency: "BRL",
                            }
                        )}</span></p>
                    <p>Forma de pagamento: <span>${servico.forma}</span></p>
                  
                </div>`;


  

     const mensagemFedback = document.querySelector(".mensagem-sucesso");

     mensagemFedback.textContent = "Serviço cadastrado com sucesso!";
     setTimeout(() => {
         mensagemFedback.textContent = "Último serviço cadastrado";
     },2000);
        
    
  

    salvaServicoStorage();

   

};

const limpaCampo = () => {
    servico.value = "";
    valorServico.value = "";
    formaPagamento.value = "";
    dataServico.value = "";
};

document.addEventListener("DOMContentLoaded", () => {
    carregaDados();
});
