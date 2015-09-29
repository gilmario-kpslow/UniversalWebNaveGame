var controle;
var conexao;
var host = "localhos:8080" + "/servidor/websocket";
var player;

function conectar() {
    player = document.getElementById("usuario").value;
    conexao = new Conexao(host, player);
    conexao.onConect = function () {
        mostraControle();
    };
    conexao.onMessage = function (data) {
        tratarResposta(data);
    };
    conexao.conectar();
}

function iniciar() {
    controle = new Controle();
}

function mostraControle() {
    document.getElementById("login").style.display = "none";
    document.getElementById("controle").style.display = "block";
}

function enviarMensagem(mensagem) {
    console.log("enviando " + mensagem);
    conexao.enviar(mensagem);
}

function tratarResposta(data) {
    console.log(data);
}
iniciar();

