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
}
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

function posicionarInmagens() {
    div_superior.style.height = tela.height * 0.12 + "px";
    div_superior.style.padding = "2px";
    btn_l.width = tela.width * 0.2;
    btn_r.width = tela.width * 0.2;

    btn_acao_a.width = tela.width * 0.33 * 0.40;
    btn_acao_b.width = tela.width * 0.33 * 0.40;
    btn_acao_b.style.paddingTop = tela.height * 0.30 + "px";
    btn_acao_a.style.paddingTop = tela.height * 0.30 + "px";

    div_direcional.style.width = tela.width * 0.35 + "px";
    div_central.style.width = tela.width * 0.29 + "px";
    div_acao.style.width = tela.width * 0.35 + "px";

    btn_start.width = tela.width * 0.33 * 0.40;
    btn_select.width = tela.width * 0.33 * 0.40;
    btn_start.style.paddingTop = tela.height * 0.40 + "px";
    btn_select.style.paddingTop = tela.height * 0.40 + "px";

    for (var i in btn_direcional) {
        btn_direcional[i].width = tela.width * 0.33 * 0.33;
    }

}

function adicionarComandos() {
    btnlogar.addEventListener("click", function () {
        conectar();
    });
    adicionaAcoes(btn_direcao_subir, COMANDO_SUBIR);
    adicionaAcoes(btn_direcao_descer, COMANDO_DECER);
    adicionaAcoes(btn_direcao_esquerda, COMANDO_ESQUERDA);
    adicionaAcoes(btn_direcao_direita, COMANDO_DIREITA);
    adicionaAcoes(btn_acao_a, ACAO_01);
    adicionaAcoes(btn_acao_b, ACAO_02);
    adicionaAcoes(btn_l, BOTAO_L);
    adicionaAcoes(btn_r, BOTAO_R);
    adicionaAcoes(btn_select, SELECT);
    adicionaAcoes(btn_start, START);
}

function adicionaAcoes(botao, COMANDO) {
    botao.addEventListener("touchstart", function () {
        conexao.enviar(COMANDO);
    });
    botao.addEventListener("touchend", function () {
        conexao.enviar(COMANDO);
    });
}

localizarImagens();
posicionarInmagens();
adicionarComandos();