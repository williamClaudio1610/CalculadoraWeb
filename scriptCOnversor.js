document.querySelector('.btn button').addEventListener('click', function () {
    // Obtenha os valores das caixas de entrada e das comboboxes
    const inputValor = parseFloat(document.getElementById('input_box').value);
    const inputUnidade = document.getElementById('inputCategory').value;
    const resultUnidade = document.getElementById('resultCategory').value;

    const resultado = converterUnidades(inputValor, inputUnidade, resultUnidade);

    // Exiba o resultado na caixa de resultado
    document.getElementById('result_box').value = resultado;
});


/*pegamos o elemento categoria a partir do seu ID, por meio do ID
ele vai reconhecer quando uma opção for acionada, 
e consoante essa opção for acionada as outras duas combobox vao apresentar as opçoes abaixo,
essas opçoes serão adicionaadas a partir do metodo opcoesDisponiveis*/

document.getElementById("categoria").addEventListener("change", function () {
    const categoriaSelecionada = this.value;
    const opcoesInput = document.getElementById("inputCategory");
    const opcoesResult = document.getElementById("resultCategory");

    opcoesInput.innerHTML = "";
    opcoesResult.innerHTML = "";

    if (categoriaSelecionada === "Comprimento") {
        opcoesDisponiveis(["Metro", "Quilometro", "Centimetro"], opcoesInput);
        opcoesDisponiveis(["Metro", "Quilometro", "Centimetro"], opcoesResult);
    } else if (categoriaSelecionada === "Peso") {
        opcoesDisponiveis(["Quilograma", "Grama", "Tonelada"], opcoesInput);
        opcoesDisponiveis(["Quilograma", "Grama", "Tonelada"], opcoesResult);
    } else if (categoriaSelecionada === "Temperatura") {
        opcoesDisponiveis(["Celsius", "Fahrenheit", "Kelvin"], opcoesInput);
        opcoesDisponiveis(["Celsius", "Fahrenheit", "Kelvin"], opcoesResult);
    }
});

// metodo para receber as opcoes duma categporia, e onde colocar tais opções
function opcoesDisponiveis(opcoes, selectElement) {
    opcoes.forEach(function (opcao) {
        const option = document.createElement("option");
        option.value = opcao;
        option.text = opcao;
        selectElement.appendChild(option);
    });
}

//aqui ele recebe um valor a ser convertido e recebe a subcategoria de entrada e a de saida para apresentar resultados
function converterUnidades(valor, unidadeEntrada, unidadeResultado) {
    if (unidadeEntrada === "Quilometro") {
        if (unidadeResultado === "Metro") {
            return valor * 1000;
        } else if (unidadeResultado == "Centimetro") {
            return valor * 100000;
        }
    } else if (unidadeEntrada === "Metro") {
        if (unidadeResultado === "Quilometro") {
            return valor / 1000;
        } else if (unidadeResultado === "Centimetro") {
            return valor * 100;
        }
    } else if (unidadeEntrada === "Centimetro") {
        if (unidadeResultado === "Quilometro") {
            return valor / 100000;
        } else if (unidadeResultado === "Metro") {
            return valor / 100;
        }
    } else if (unidadeEntrada === "Celsius") {
        if (unidadeResultado === "Fahrenheit") {
            return (valor * 9 / 5) + 32;
        } else if (unidadeResultado === "Kelvin") {
            return valor + 273.15;
        }
    } else if (unidadeEntrada === "Fahrenheit") {
        if (unidadeResultado === "Celsius") {
            return (valor - 32) * 5 / 9;
        } else if (unidadeResultado === "Kelvin") {
            return (valor - 32) * 5 / 9 + 273.15;
        }
    } else if (unidadeEntrada === "Kelvin") {
        if (unidadeResultado === "Celsius") {
            return valor - 273.15;
        } else if (unidadeResultado === "Fahrenheit") {
            return (valor - 273.15) * 9 / 5 + 32;
        }
    } else if (unidadeEntrada === "Quilograma") {
        if (unidadeResultado === "Grama") {
            return valor * 1000;
        } else if (unidadeResultado === "Tonelada") {
            return valor / 1000;
        }
    } else if (unidadeEntrada === "Grama") {
        if (unidadeResultado === "Quilograma") {
            return valor / 1000;
        } else if (unidadeResultado === "Tonelada") {
            return valor / 1000000;
        }
    } else if (unidadeEntrada === "Tonelada") {
        if (unidadeResultado === "Quilograma") {
            return valor * 1000;
        } else if (unidadeResultado === "Grama") {
            return valor * 1000000;
        }
    }else{
        return 0;
    }

}
