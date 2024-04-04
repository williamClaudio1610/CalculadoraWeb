
const previous_operacaoText = document.querySelector("#previous-operacao");
const operacao_atualText = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#botoes button");

console.log(buttons)


class calculadora {
    constructor(previous_operacaoText, operacao_atualText) {
        this.previous_operacaoText = previous_operacaoText;
        this.operacao_atualText = operacao_atualText;
        this.operacao_atual = "";

    }

    //adicionar um digito
    addDigito(digit) {
        console.log(digit);
        //verificar se um numero já tem ponto
        if (digit == "." && operacao_atualText.innerText.includes(".")) {
            return;
        }

        this.operacao_atual = digit
        this.atualizarVisor();

    }

    //processamento das operações

    processamentoOperacao(operation) {

        // Check if current value is empty
        if (this.operacao_atualText.innerText === "" && operation !== "C") {
            // Change operation
            if (this.previous_operacaoText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }


        //pegar valor atual e o anterior
        let valorOperacao;
        const anterior = +this.previous_operacaoText.innerText;
        const atual = +this.operacao_atualText.innerText;

        switch (operation) {
            case "+":
                valorOperacao = anterior + atual;
                this.atualizarVisor(valorOperacao, operation, atual, anterior)
                break;
            case "-":
                valorOperacao = anterior + atual;
                this.atualizarVisor(valorOperacao, operation, atual, anterior)
                break;
            case "*":
                valorOperacao = anterior + atual;
                this.atualizarVisor(valorOperacao, operation, atual, anterior)
                break;
            case "/":
                valorOperacao = anterior + atual;
                this.atualizarVisor(valorOperacao, operation, atual, anterior)
                break;
            /*

        case "DEL":
            this.processDelOperator();
            break;
        case "CE":
            this.processClearCurrentOperator();
            break;
        case "C":
            this.processClearOperator();
            break;
        case "=":
            this.processEqualOperator();
            break;
            */
            default:
                return;
        }

    }

    atualizarVisor(valorOperacao = null, operation = null, atual = null, anterior = null) {

        console.log(valorOperacao, operacao, atual, anterior);
        if (valorOperacao === null) {
            this.operacao_atualText.innerText += this.operacao_atual;

        } else {
            //verificar se o valot é zero, se for, apenas adiciona ao valor atual
            if (anterior === 0) {
                valorOperacao = atual;
            }
            //adicionar valor atual para o anterior
            this.previous_operacaoText.innerText = `${valorOperacao} ${operation}`;
            this.operacao_atualText.innerText = "";
        }



    }

    /*
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previous_operacaoText.innerText =
            this.previous_operacaoText.innerText.slice(0, -1) + operation;
    }

    // Delete a digit
    processDelOperator() {
        this.operacao_atualText.innerText =
            this.operacao_atualText.innerText.slice(0, -1);
    }

    // Clear current operation
    processClearCurrentOperator() {
        this.operacao_atualText.innerText = "";
    }

    // Clear all operations
    processClearOperator() {
        this.operacao_atualText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }x
    */

}


const calc = new calculadora(previous_operacaoText, operacao_atualText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;
        //console.log(valor);

        if (+valor >= 0 || valor === ".") {
            //console.log(valor);
            calc.addDigito(valor);
        } else {
            calc.processamentoOperacao(valor);
        }

    });

})
