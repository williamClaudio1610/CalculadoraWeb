class Calculadora {
    constructor(previousOperacaoText, operacaoAtualText) {
        this.previousOperacaoText = previousOperacaoText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
        this.operacaoAnterior = "";
        this.operacao = undefined;
        this.historico = [];

        if (localStorage.getItem('historico') == null) {
            localStorage.setItem('historico', JSON.stringify(this.historico));
        } else {
            this.historico = JSON.parse(localStorage.getItem('historico'));
        }
        
    }


    //adiiconar um digito para calcular
    addDigito(digit) {
        if (digit === "." && this.operacaoAtual.includes(".")) return;

        this.operacaoAtual = this.operacaoAtual.toString() + digit.toString();
        this.atualizarVisor();
    }


    processamentoOperacao(operation) {
        if (this.operacaoAtual === "") return;
        if (this.operacaoAnterior !== "") {
            this.realizarCalculo();
        }
        this.operacao = operation;
        this.operacaoAnterior = this.operacaoAtual;
        this.operacaoAtual = "";
    }

    realizarCalculo() {
        let resultado;
        const anterior = parseFloat(this.operacaoAnterior);
        const atual = parseFloat(this.operacaoAtual);

        //verificar se é um número a partir da funcao nativa do JS isNaN
        if (isNaN(anterior) || isNaN(atual)) return;
        switch (this.operacao) {
            case "+":
                resultado = (anterior + atual);
                this.historico.push(`${anterior} ${this.operacao} ${atual} = ${resultado}`);
                break;
            case "-":
                resultado = (anterior - atual);
                this.historico.push(`${anterior} ${this.operacao} ${atual} = ${resultado}`);
                break;
            case "x":
                resultado = (anterior * atual);
                this.historico.push(`${anterior} ${this.operacao} ${atual} = ${resultado}`);
                break;
            case "/":
                resultado = (anterior / atual).toFixed(2);
                this.historico.push(`${anterior} ${this.operacao} ${atual} = ${resultado}`);
                break;
            case "sqrt":
                resultado = Math.sqrt(atual).toFixed(5);
                this.historico.push(`${this.operacao}(${atual}) = ${resultado}`);
                break;
            case "%":
                resultado = (atual / 100).toFixed(2);
                this.historico.push(`${anterior} ${this.operacao} ${atual} = ${resultado}`);
                break;
            case "^":
                resultado = Math.pow(anterior, atual).toFixed(1);
                this.historico.push(`${anterior} ${this.operacao} ${atual} = ${resultado}`);
                break;
            case "log":
                resultado = Math.log10(atual).toFixed(2);
                this.historico.push(`${this.operacao}(${atual}) = ${resultado}`);
                break;
            case "sin":
                resultado = Math.sin(atual * (Math.PI / 180)).toFixed(2);
                this.historico.push(`${this.operacao}(${atual}) = ${resultado}`);
                break;
            case "cos":
                resultado = Math.cos(atual * (Math.PI / 180)).toFixed(2);
                this.historico.push(`${this.operacao}(${atual}) = ${resultado}`);
                break;
            case "tan":
                resultado = Math.tan(atual * (Math.PI / 180)).toFixed(2);
                this.historico.push(`${this.operacao}(${atual}) = ${resultado}`);
                break;
            default:
                return;
        }
        this.salvarHistorico();
        this.operacaoAtual = resultado;
        this.operacaoAnterior = "";
        this.operacao = undefined;
        this.atualizarVisor();
    }

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

    salvarHistorico() {
        localStorage.setItem('historico', JSON.stringify(this.historico));
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
        } else if (valor === "CE") {
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
