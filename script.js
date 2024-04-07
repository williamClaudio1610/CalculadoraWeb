document.getElementById("botao-historico").addEventListener("click", function() {
    const outraDiv = document.getElementById("outra-div");
    
    // Verifica se a outra div está visível ou não
    if (outraDiv.style.display === "none" || outraDiv.style.display === "") {
        // Se estiver oculta, mostra-a e exibe o histórico
        outraDiv.style.display = "block";
        mostrarHistorico();
    } else {
        // Se estiver visível, oculta-a
        outraDiv.style.display = "none";
        // Limpa o conteúdo da outra div
        outraDiv.innerHTML = "";
    }
});



//classe calculadora, apenas para organização
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
    

    formatarHistorico() {
        let historicoFormatado = "";
        this.historico.forEach((item, index) => {
            historicoFormatado += `${index + 1}. ${item}\n`; 
            // Adiciona cada item do histórico com um número de ordem
        });
        return historicoFormatado;
    }

    


    //adicionar um digito para calcular ou ser processado, 
    addDigito(digit) {
        //verificar se ja existe um . no numero a ser digitado
        if (digit === "." && this.operacaoAtual.includes(".")) return;

        //concatenar os digitos até o momento que for uma operação
        this.operacaoAtual = this.operacaoAtual.toString() + digit.toString();
        //atualiza o visor para o valor atual
        this.atualizarVisor();
    }

    //aqui ele pega uma operação, depois de pegar uma operação válida ele vai para o metodo realizar um calculo
    processamentoOperacao(operation) {
        if (this.operacaoAtual === "") return;
        if (this.operacaoAnterior !== "") {
            this.realizarCalculo();
        }
        this.operacao = operation;
        this.operacaoAnterior = this.operacaoAtual;
        this.operacaoAtual = "";
    }

    processarUnario(operacao) {
        if (this.operacao == undefined) {
            this.operacao = operacao;
            this.operacaoAnterior = "0";
            this.realizarCalculo();
            return;
        }

        const opOriginal = this.operacao;
        const operandoAnt = this.operacaoAnterior;
        this.operacao = operacao;
        this.realizarCalculo();
        this.operacao = opOriginal;
        this.operacaoAnterior = operandoAnt;
        this.realizarCalculo();
    }

    // aqui o calculo é feito por meio de uma operação feita pelo usuario
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
            case "RaizQ":
                resultado = Math.sqrt(atual).toFixed(2);
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
            case "+/-":
                resultado = atual*(-1);
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
        mostrarHistorico();
    }

    
    //aqui o visor é atualizado para o valor atual após uma operação ser feita
    atualizarVisor() {
        this.operacaoAtualText.innerText = this.operacaoAtual;
        if (this.operacao !== undefined) {
            this.previousOperacaoText.innerText = `${this.operacaoAnterior} ${this.operacao}`;
        } else {
            this.previousOperacaoText.innerText = "";
        }
    }
    // metodo para quando o botão CE for acionado, limpa tudo no visor
    limpar() {
        this.operacaoAtual = "";
        this.operacaoAnterior = "";
        this.operacao = undefined;
        this.atualizarVisor();
    }

    //metodo para apagar um numero do visor
    deletar() {
        this.operacaoAtual = this.operacaoAtual.toString().slice(0, -1);
        this.atualizarVisor();
    }

    salvarHistorico() {
        localStorage.setItem('historico', JSON.stringify(this.historico));
    }
}

// Função para mostrar o histórico na outra-div
function mostrarHistorico() {
    const outraDiv = document.getElementById("outra-div");
    // Chama a função formatarHistorico() e exibe o histórico na outra-div
    outraDiv.innerText = calc.formatarHistorico(); 
    // Adiciona o histórico formatado à outra div
    outraDiv.innerText = historicoFormatado;
}


const previousOperacaoText = document.querySelector("#previous-operacao");
const operacaoAtualText = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#botoes button");

const calc = new Calculadora(previousOperacaoText, operacaoAtualText);
const operadoresUnarios = ["tan", "sen", "cos", "%", "RaizQ", "log","+/-"];

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
        } else if (operadoresUnarios.includes(valor)) {
            calc.processarUnario(valor);
        } else {
            calc.processamentoOperacao(valor);
            
        }
    });
});
