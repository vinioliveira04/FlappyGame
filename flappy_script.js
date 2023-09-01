//função que cria elementos html
function novoElemento(tagName, className){
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem
}

//criar tanto as barrreiras superiores e inferiores
function barreira(reversa = false){

    this.elemento = novoElemento('div', 'barreira');

    const borda = novoElemento('div', 'borda');
    const corpo = novoElemento('div', 'corpo');

    this.elemento.appendChild(reversa ? corpo : borda);
    this.elemento.appendChild(reversa ? borda : corpo);

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

//criando o par de barrreira e deixando a abertura de forma automatica
function ParDeBarreiras(altura, abertura, x){

    this.elemento = novoElemento('div', 'par_de_barreiras');

    this.superior = new barreira(true);
    this.inferior = new barreira(false);

    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.setAltura(alturaSuperior);
        this.inferior.setAltura(alturaInferior);
    }
    
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0]);
    this.setX = x => this.elemento.style.left = `${x}px`;
    this.getLargura = () => this.elemento.clientWidth;
    
    this.sortearAbertura();
    this.setX(x);
}

//criando 4 barreiras e fazendo com que elas se movimentem de forma infinita
function barreiras(altura, largura, abertura, espaco, notificarPonto){

    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3),
    ];

    const deslocamento = 4;
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento);

            if(par.getX() < -par.getLargura()){
                par.setX(par.getX() + espaco * this.pares.length);
                par.sortearAbertura();
            }
            const meio = largura / 2;
            const cruzouMeio = par.getX() + deslocamento >= meio && par.getX() < meio;
            if (cruzouMeio) notificarPonto();
        })
    };
}

//criando o passaro
function passaro(alturaJogo){
    let voando = false;
    
    this.elemento = novoElemento('img', 'passaro');
    this.elemento.src = 'passaro.png';

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0]);
    this.setY = y => this.elemento.style.bottom = `${y}px`;

    window.onkeydown = e => voando = true;
    window.onkeyup = e => voando = false;

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5);
        const alturaMaxima = alturaJogo - this.elemento.clientHeight;

        if (novoY <= 0){
            this.setY(0);
        } else if (novoY >= alturaMaxima){
            this.setY(alturaMaxima);
        } else {
            this.setY(novoY);
        }
    }
    
    this.setY(alturaJogo / 2);
}

//calculando o progresso do jogo
function progresso(){
    this.elemento = novoElemento('div', 'progresso');
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0);
}

//verificando colisão do passaro nas barreiras
function sobrepostos(elementoA, elementoB){

    const a = elementoA.getBoundingClientRect();
    const b = elementoB.getBoundingClientRect();

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

    return horizontal && vertical
}

function colidiu(passaro, barreiras){
    let colidiu = false;
    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu){
            const superior = parDeBarreiras.superior.elemento;
            const inferior = parDeBarreiras.inferior.elemento;
            colidiu = sobrepostos(passaro.elemento, superior) || sobrepostos(passaro.elemento, inferior);
        };
    })
    return colidiu
}

//iniciando o jogo
function play(){
    let pontos = 0;

    const areaDoJogo = document.querySelector('.jogo');
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progredir = new progresso();
    const bar = new barreiras(altura, largura, 275, 400, 
        () => {
            pontos++
            progredir.atualizarPontos(pontos)});    
    const passarinho = new passaro(altura);

    areaDoJogo.appendChild(progredir.elemento);
    areaDoJogo.appendChild(passarinho.elemento);
    bar.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    this.start = () => {
        const temporizador = setInterval(() => {
            bar.animar();
            passarinho.animar();
            if (colidiu(passarinho, bar)){
                clearInterval(temporizador);
            }
        }, 20);
    }
}

new play().start();