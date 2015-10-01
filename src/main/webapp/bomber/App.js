var tela;
var canvas;
var contexto;

function iniciaTela() {
    tela = new Tela(window);
    criaCanvas();
}

function criaCanvas() {
    var body = document.querySelector("body");
    body.innerHTML = "<canvas width='" + tela.largura + "' height='" + tela.altura + "' id='canvas'></canvas>" + body.innerHTML;
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");
    contexto.fillStyle = "blue";
    contexto.fillRect(0, 0, tela.largura, tela.altura);
}

iniciaTela();