//criando elementos
function novoElemento(name, classname) {
    const elem = document.createElement(name);
    elem.className = classname;
    return elem;
}


// criando barreira em cima
function criar_barreira_cima(altura) {
    //criando barreira
    const barreira = novoElemento('div', 'barreira');

    //criando as partes da barreira
    const corpo = novoElemento('div', 'corpo_cima');
    const tampa = novoElemento('div', 'tampa');

    //definindo altura do corpo da barreira
    corpo.style.height = `${altura}px`;

    //inserindo as partes da barreira na barreira
    barreira.appendChild(corpo);
    barreira.appendChild(tampa);

    return barreira;
}
// criando barreira em baixo
function criar_barreira_baixo(altura) {
    //criando barreira
    const barreira = novoElemento('div', 'barreira');

    //criando as partes da barreira
    const corpo = novoElemento('div', 'corpo_baixo');
    const tampa = novoElemento('div', 'tampa');

    //definindo altura do corpo da barreira
    corpo.style.height = `${altura}px`;

    //inserindo as partes da barreira na barreira
    barreira.appendChild(tampa);
    barreira.appendChild(corpo);

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
    const barreira_superior = criar_barreira_cima(altura01);
    const barreira_inferior = criar_barreira_baixo(altura02);

    //adicionando as duas barreiras no elemento
    par.appendChild(barreira_superior);
    par.appendChild(barreira_inferior);

    // enviando o par de barreiras
    return par
}


//criando 4 pares de barreiras
function conjunto_barreiras(){
    let i = 1;
    let barreira_list = [];

    //criando as 4 barreiras com suas distâncias definidas já
    while (i <= 4){
        let barreira = par_de_barreiras();
        barreira.style.position = 'absolute';

        //definindo distancia delas
        if (i == 1){
            barreira.style.left = `650px`;
        } else if (i == 2) {
            barreira.style.left = `1000px`;
        } else if (i == 3) {
            barreira.style.left = `1350px`;
        } else if (i == 4) {
            barreira.style.left = `1700px`;
        }
        document.querySelector('.jogo').appendChild(barreira);

        barreira_list.push(barreira);
        i++;
    }

    //movimentando as barreiras
    setInterval(() =>movimentar_barreira(barreira_list), 50);
    //primeiro reset da primeira barreira
    setTimeout(() => prieiro_reset_barreira(barreira_list[0]), 21500);
    //primeiro reset da segunda barreira

    //primeiro reset da terceira barreira

    //primeiro reset da quarta barreira

    // >=2 reset da primeira barreira

    // >=2 reset da segunda barreira

    // >=2 reset da terceira barreira

    // >=2 reset da quarta barreira

}


//fazendo com que as barreiras se movimentem
function movimentar_barreira(barreira){
    const movimento = 2;
    for (let i = 0; i < barreira.length; i++) {
        let novaPosicao = parseInt(barreira[i].style.left) - movimento;
        barreira[i].style.left = `${novaPosicao}px`;
    }
}


//fazendo o primeiro reset do primeiro par de barreira
function prieiro_reset_barreira(barreira){
    //deixando a barreira invisivel
    barreira.style.display = `none`;

    //alterando o tamanho dela
    const tamanho_min = 25;
    let altura01 = Math.random() * (400 - tamanho_min);
    let altura02 = 400 - altura01
    altura01 += 25
    altura02 += 25
    barreira.querySelector('.corpo_cima').style.height = `${altura01}px`;
    barreira.querySelector('.corpo_baixo').style.height = `${altura02}px`;

    //voltando ela para o inicio
    barreira.style.left = `1200px`;
    
    //exibindo ela novamente na tela
    barreira.style.display = `flex`
}


//dando play no jogo
function play(){
    conjunto_barreiras();
}

play();