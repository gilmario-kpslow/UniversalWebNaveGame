var btn_r;
var btn_l;
var btn_start;
var btn_select;
var btn_acao_a;
var btn_acao_b;
var btn_direcao_direita;
var btn_direcao_esquerda;
var btn_direcao_subir;
var btn_direcao_descer;
var tela;
var div_direcional;
var div_central;
var div_acao;
var div_superior;
var btnlogar;
document.oncontextmenu = function () {
    return false;
};
function localizarImagens() {
    tela = window.screen;
    btn_l = document.getElementById("btn_l");
    btnlogar = document.getElementById("btnlogar");
    btn_r = document.getElementById("btn_r");
    btn_direcao_descer = document.getElementById("btn_direcao_descer");
    btn_direcao_subir = document.getElementById("btn_direcao_subir");
    btn_direcao_direita = document.getElementById("btn_direcao_direita");
    btn_direcao_esquerda = document.getElementById("btn_direcao_esquerda");
    btn_acao_a = document.getElementById("btn_acao_a");
    btn_acao_b = document.getElementById("btn_acao_b");
    btn_start = document.getElementById("btn_start");
    btn_select = document.getElementById("btn_select");
    btn_direcional = document.getElementsByClassName("direcional");
    div_direcional = document.getElementById("div_direcional");
    div_central = document.getElementById("div_central");
    div_acao = document.getElementById("div_acao");
    div_superior = document.getElementById("div_superior");
}


function adicionaAcoes(botao, COMANDO, disparada) {
    var comando = new Comando(COMANDO, disparada);
    botao.addEventListener("touchstart", function () {
        conexao.enviar(JSON.stringify(comando));
    });
    if (!disparada) {
        botao.addEventListener("touchend", function () {
            conexao.enviar(JSON.stringify(comando));
        });
    }
}

localizarImagens();
posicionarInmagens();
adicionarComandos();