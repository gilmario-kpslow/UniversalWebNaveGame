var tela;
var canvas;
var contexto;
var bombers = [];
var totalImagens = 0;
var imagensCarregadas = 0;
var controle;
var animacao;
var imagens = {
    bomber01: "sbm4-bazooka-bomber.gif"
};
function iniciaTela() {
    tela = new Tela(window);
    criaCanvas();
    carregarMidias();
}

function criaCanvas() {
    var body = document.querySelector("body");
    body.innerHTML = "<canvas width='" + tela.largura + "' height='" + tela.altura + "' id='canvas'></canvas>" + body.innerHTML;
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");
    contexto.fillStyle = "blue";
    contexto.fillRect(0, 0, tela.largura, tela.altura);
}
function carregarMidias() {
    for (var i in imagens) {
        totalImagens++;
        var img = new Image();
        img.src = "img/" + imagens[i];
        img.onload = carregou;
        imagens[i] = img;
    }
}

function carregou() {
    imagensCarregadas++;
    if (imagensCarregadas == totalImagens) {
        criaObjetos();
    }
}

function criaObjetos() {
    controle = new Controle();
    animacao = new Animacao(contexto);
    criaPersonagens();
}


function criaPersonagens() {
    var bomber01 = new Bomber(contexto, controle, imagens.bomber01);
    bomber01.posicionar();
    bomber01.velocidade = 200;
    animacao.novoSprite(bomber01);
    animacao.ligar();
}

iniciaTela();