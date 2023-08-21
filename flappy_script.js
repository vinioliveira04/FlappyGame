//criando elementos
function novoElemento(name, classname) {
    const elem = document.createElement(name);
    elem.className = classname;
    return elem;
}


// criando barreira em cima
function criar_barreira_cima(altura) {
    const barreira = novoElemento('div', 'barreira');

    const corpo = novoElemento('div', 'corpo_cima');
    const tampa = novoElemento('div', 'tampa');

    corpo.style.height = `${altura}px`;

    barreira.appendChild(corpo);
    barreira.appendChild(tampa);

    return barreira;
}
// criando barreira em baixo
function criar_barreira_baixo(altura) {
    const barreira = novoElemento('div', 'barreira');

    const corpo = novoElemento('div', 'corpo_baixo');
    const tampa = novoElemento('div', 'tampa');

    corpo.style.height = `${altura}px`;

    barreira.appendChild(tampa);
    barreira.appendChild(corpo);

    return barreira;
}


//criando um par de barreira
function par_de_barreiras(){
    const par = novoElemento('div', 'par_de_barreiras');

    const tamanho_min = 25;
    let altura01 = Math.random() * (400 - tamanho_min);
    let altura02 = 400 - altura01
    altura01 += 25
    altura02 += 25

    const barreira_superior = criar_barreira_cima(altura01);
    const barreira_inferior = criar_barreira_baixo(altura02);

    par.appendChild(barreira_superior);
    par.appendChild(barreira_inferior);

    return par
}


//criando 4 pares de barreiras
function conjunto_barreiras(){
    let i = 1;
    let barreira_list = [];

    while (i <= 4){
        let barreira = par_de_barreiras();
        barreira.style.position = 'absolute';

        if (i == 1){
            barreira.style.left = `320px`;
        } else if (i == 2) {
            barreira.style.left = `650px`;
        } else if (i == 3) {
            barreira.style.left = `970px`;
        } else if (i == 4) {
            barreira.style.left = `1300px`;
        }
        document.querySelector('.jogo').appendChild(barreira);

        barreira_list.push(barreira);
        i++;
    }

    //movimentando todas as 4 barreiras e reiniciando elas com diferente buracos
    setInterval(() =>movimentar_barreira(barreira_list), 50);
}


//fazendo com que as barreiras se movimentem
function movimentar_barreira(barreiras){
    const movimento = 4;
    
    for (let i = 0; i < barreiras.length; i++) {
        let barreira = barreiras[i];

        let novaPosicao = parseInt(barreira.style.left) - movimento;
        barreira.style.left = `${novaPosicao}px`;

        if (novaPosicao <= -98){
            barreira.style.display = 'none';
            const tamanho_min = 25;
            let altura01 = Math.random() * (400 - tamanho_min);
            let altura02 = 400 - altura01;
            altura01 += 25;
            altura02 += 25;
            barreira.querySelector('.corpo_cima').style.height = `${altura01}px`;
            barreira.querySelector('.corpo_baixo').style.height = `${altura02}px`;
            barreira.style.left = '1200px';
            barreira.style.display = 'flex';
        }
    }
}


//Fazendo aparecer o passaro na tela
function passaro(){
    const div_passaro = document.querySelector('.passaro')
    const img_passaro = document.createElement('img');
    img_passaro.src = './passaro.png';
    div_passaro.style.position = "absolute"
    div_passaro.style.top = "320px"
    div_passaro.style.left = "100px"
    div_passaro.appendChild(img_passaro);
}


//deixar como pré definido que o pássaro não está voando
let voando = false;

//movimento de jump do passaro
function voar() {
    const movimento = 30;

    const div_passaro = document.querySelector('.passaro');
    let atual_altura = div_passaro.offsetTop;

    console.log(atual_altura)

    if(atual_altura <= 20){

    }else {
        if (!voando){
            voando = true;
            let altura = atual_altura - movimento;
            div_passaro.style.top = `${altura}px`;

            setInterval(() => {
                voando = false;
            }, 100);
        }}
}

//descendo o pássaro quando não pressionar nenhuma tecla
function descendo_automatico(){
    setInterval(() => {
        if (!voando){
            mover_baixo()
        }
    }, 50);
}

//fazendo com que o pássaro se movimente para baixo
function mover_baixo(){
    const div_passaro = document.querySelector('.passaro');
    let altura = div_passaro.offsetTop;
    const descer = 6;
    if (altura >= 630){

    } else {
        nova_altura = altura + descer;
        div_passaro.style.top = `${nova_altura}px`
    }

}


//dando play no jogo
function play(){
    conjunto_barreiras();
    passaro();
    descendo_automatico();

    document.addEventListener("keydown", (evt) => {
        evt = evt || window.event;
        var key = evt.key;

        if (key == "ArrowUp" || key == " ") {voar();}
    });
}

play();