//criando elementos
function novoElemento(name, classname) {
    const elem = document.createElement(name);
    elem.className = classname;
    return elem;
}



// criando barreira
function criarBarreira(superior = true, altura) {
    //criando barreira
    const barreira = novoElemento('div', 'barreira');

    //criando as partes da barreira
    const corpo = novoElemento('div', 'corpo');
    const tampa = novoElemento('div', 'tampa');

    //definindo altura do corpo da barreira
    corpo.style.height = `${altura}px`;

    //inserindo as partes da barreira na barreira
    barreira.appendChild(superior ? corpo : tampa);
    barreira.appendChild(superior ? tampa : corpo);

    return barreira;
}

//criando um par de barreira
function par_de_barreiras(){
    //criando o elemento onde vai ficar as duas barreiras
    const par = novoElemento('div', 'par_de_barreiras');

    //definindo altura dos corpos das barreiras para poder criar elas
    const tamanho_min = 25;
    let altura01 = Math.random() * (400 - tamanho_min);
    let altura02 = 400 - altura01
    altura01 += 25
    altura02 += 25

    //criando as duas barreiras
    const barreira_superior = criarBarreira(true, altura01);
    const barreira_inferior = criarBarreira(false, altura02);

    //adicionando as duas barreiras no elemento
    par.appendChild(barreira_superior);
    par.appendChild(barreira_inferior);

    // enviando o par de barreiras
    return par
}



//criando 4 pares de barreiras
function conjunto_barreiras(){
    let i = 1;
    const inicio_fixo = 650
    let deslocamento = 0;

    while (i <= 4){
        let barreira = par_de_barreiras();
        barreira.style.position = 'absolute';
        barreira.style.left = `${inicio_fixo + (deslocamento * i)}px`;
        document.querySelector('.jogo').appendChild(barreira);

        if (i == 1){
            deslocamento = 250
        }
        i++;
    }
}

function play(){
    conjunto_barreiras();
}

play();