class Calculadora {
    constructor(previousOperacaoText, operacaoAtualText) {
        this.previousOperacaoText = previousOperacaoText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
        this.operacaoAnterior = "";
        this.operacao = undefined;
    }


    //adicionar um digito para calcular
    addDigito(digit) {
        if (digit === "." && this.operacaoAtual.includes(".")) return;
        this.operacaoAtual = this.operacaoAtual.toString() + digit.toString();
        this.atualizarVisor();
    }

    //processar uma operação a escolha do user
    processamentoOperacao(operation) {
        if (this.operacaoAtual === "") return;
        if (this.operacaoAnterior !== "") {
            this.realizarCalculo();
        }
        this.operacao = operation;
        this.operacaoAnterior = this.operacaoAtual;
        this.operacaoAtual = "";
    }

    //realizar calculo quando o input for  =
    realizarCalculo() {
        let resultado;
        const anterior = parseFloat(this.operacaoAnterior);
        const atual = parseFloat(this.operacaoAtual);

        //verificar se é um número a partir da funcao nativa do JS isNaN
        if (isNaN(anterior) || isNaN(atual)) return;
        switch (this.operacao) {
            case "+":
                resultado = anterior + atual;
                break;
            case "-":
                resultado = anterior - atual;
                break;
            case "*":
                resultado = anterior * atual;
                break;
            case "/":
                resultado = anterior / atual;
                break;
            default:
                return;
        }
        this.operacaoAtual = resultado;
        this.operacaoAnterior = "";
        this.operacao = undefined;
        this.atualizarVisor();
    }

    
//atualizar o visor
    atualizarVisor() {
        this.operacaoAtualText.innerText = this.operacaoAtual;
        if (this.operacao !== undefined) {
            this.previousOperacaoText.innerText = `${this.operacaoAnterior} ${this.operacao}`;
        } else {
            this.previousOperacaoText.innerText = "";
        }
    }

    limpar() {
        this.operacaoAtual = "";
        this.operacaoAnterior = "";
        this.operacao = undefined;
        this.atualizarVisor();
    }

    deletar() {
        this.operacaoAtual = this.operacaoAtual.toString().slice(0, -1);
        this.atualizarVisor();
    }
}

const previousOperacaoText = document.querySelector("#previous-operacao");
const operacaoAtualText = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#botoes button");

const calc = new Calculadora(previousOperacaoText, operacaoAtualText);

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const valor = btn.innerText;
        if (!isNaN(valor) || valor === ".") {
            calc.addDigito(valor);
        } else if (valor === "C") {
            calc.limpar();
        } else if (valor === "DEL") {
            calc.deletar();
        } else if (valor === "=") {
            calc.realizarCalculo();
        } else {
            calc.processamentoOperacao(valor);
        }
    });
});
