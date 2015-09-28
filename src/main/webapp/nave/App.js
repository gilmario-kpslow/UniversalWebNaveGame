var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var imagens;
var animacao;
var teclado;
var colisor;
var nave;
var criadorInimigos;
var totalImagens = 0;
var carregadas = 0;
var espaco;
var nave;
var estrelas;
var nuvens;
var SOM_TIRO;
var SOM_EXPLOSAO;
var SOM_JOGO;
var painel;

function carregarMidias() {
    imagens = {
        espaco: "fundo-espaco.png",
        estrelas: "fundo-estrelas.png",
        nuvens: "fundo-nuvens.png",
        nave: "nave-spritesheet.png",
        ovni: "ovni.png",
        esplosao: "explosao.png"
    };
    for (var i in imagens) {
        totalImagens++;
        var img = new Image();
        img.src = "img/" + imagens[i];
        img.onload = carregando;
        imagens[i] = img;
    }

    sons = {
        esplosao: "explosao.mp3",
        acao: "musica-acao.mp3",
        tiro: "tiro.mp3"
    };
    SOM_TIRO = criaSon(sons.tiro);
    SOM_EXPLOSAO = criaSon(sons.esplosao);
    SOM_JOGO = criaSon(sons.acao);


}

function criaSon(res) {
    var son = new Audio();
    son.src = "snd/" + res;
    son.volume = 0.2;
    son.load();
    return son;
}

function carregando() {
    contexto.save();
    contexto.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);
    contexto.fillStyle = "white";
    contexto.font = "50pt sans-serif";
    contexto.fillText("Carregando", 100, 200);
    var tamanhoTotal = 300;
    var tamanho = carregadas / totalImagens * tamanhoTotal;
    contexto.fillStyle = "red";
    contexto.fillRect(100, 250, tamanho, 50);
    contexto.restore();

    carregadas++;
    if (carregadas == totalImagens) {
        iniciarObjetos();
        mostraLinkJogar();
    }
}

function iniciarObjetos() {
    animacao = new Animacao(contexto);
    teclado = new Teclado(document);
    colisor = new Colisor();
    espaco = new Fundo(contexto, imagens.espaco);
    estrelas = new Fundo(contexto, imagens.estrelas);
    nuvens = new Fundo(contexto, imagens.nuvens);
    nave = new Nave(contexto, teclado, imagens.nave, imagens.esplosao);
    painel = new Painel(contexto, nave);
    animacao.novoSprite(espaco);
    animacao.novoSprite(estrelas);
    animacao.novoSprite(nuvens);
    animacao.novoSprite(nave);
    animacao.novoSprite(painel);
    colisor.novoSprite(nave);
    animacao.novoProcessamento(colisor);
    configuracoesIniciais();
}

function configuracoesIniciais() {
    espaco.velocidade = 100;
    estrelas.velocidade = 140;
    nuvens.velocidade = 200;
    nave.posicionar();
    nave.velocidade = 200;
    nave.acabaramVidas = function () {

        gameOver();
    };
    colisor.aoColidir = function (o1, o2) {
        if ((o1 instanceof Tiro && o2 instanceof  Ovni) || (o2 instanceof Tiro && o1 instanceof  Ovni)) {
            painel.pontuacao += 10;
        }
    };
    criacaoInimigos();
}

function pausarJogo() {
    if (animacao.ligado) {
        animacao.desligar();
        ativarTiro(false);
        contexto.save();
        contexto.fillStyle = "white";
        contexto.strokeStyle = "black";
        contexto.font = "50px sans-serif";
        contexto.fillText("Pausado", 160, 200);
        contexto.restore();
        SOM_JOGO.pause();
    } else {
        animacao.ligar();
        criador.ultimoOvni = new Date().getTime();
        ativarTiro(true);
        SOM_JOGO.play();

    }
}

function ativarTiro(ativar) {
    if (ativar) {
        teclado.disparou(ESPACO, function () {
            nave.atirar();
        });
    } else {
        teclado.disparou(ESPACO, null);
    }
}

function criacaoInimigos() {
    criador = {
        ultimoOvn: new Date().getTime(),
        processar: function () {
            var agora = new Date().getTime();
            var decorrido = agora - this.ultimoOvn;
            if (decorrido > 1000) {
                this.novoOvni();
                this.ultimoOvn = agora;
            }
        },
        novoOvni: function () {
            var ovni = new Ovni(contexto, imagens.ovni, imagens.esplosao);
            ovni.velocidade = Math.floor((100 + Math.random() * (200 - 100 + 1)));
            ovni.x = Math.floor(Math.random() * (canvas.width - imagens.ovni.width + 1));
            ovni.y = -imagens.ovni.height;
            animacao.novoSprite(ovni);
            colisor.novoSprite(ovni);
            return ovni;
        }

    };
    animacao.novoProcessamento(criador);
}

function mostraLinkJogar() {
    document.getElementById("link_jogar").style.display = 'block';
}

function musicaFundo() {
    SOM_JOGO.volume = 0.8;
    SOM_JOGO.loop = true;
}

function iniciarJogo() {
    criador.ultimoOvni = new Date().getTime();
    document.getElementById("link_jogar").style.display = 'none';
    teclado.disparou(ENTER, function () {
        pausarJogo();
    });
    SOM_JOGO.play();
    animacao.ligar();
    ativarTiro(true);
    painel.pontuacao = 0;
}

function gameOver() {
    animacao.desligar();
    ativarTiro(false);
    teclado.disparou(ENTER, null);
    SOM_JOGO.pause();
    SOM_JOGO.currentTime = 0.0;
    contexto.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "white";
    contexto.strokeStyle = "black";
    contexto.font = "70px sans-serif";
    contexto.fillText("GAME OVER", 40, 200);
    contexto.restore();
    mostraLinkJogar();
    nave.vidas = 5;
    nave.posicionar();
    animacao.novoSprite(nave);
    colisor.novoSprite(nave);
    removerInimigos();
}

function removerInimigos() {
    for (var i in animacao.sprites) {
        if (animacao.sprites[i] instanceof Ovni) {
            animacao.excluirSprite(animacao.sprites[i]);
        }
    }
}

carregarMidias();
musicaFundo();