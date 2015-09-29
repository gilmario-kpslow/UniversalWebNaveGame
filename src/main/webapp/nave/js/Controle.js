var COMANDO_ESQUERDA = "esquerda";
var COMANDO_DIREITA = "direita";
var COMANDO_SUBIR = "subir";
var COMANDO_DECER = "descer";
var ACAO_01 = "acao01";
var ACAO_02 = "acao02";
var BOTAO_L = "botaol";
var BOTAO_R = "botaor";
var SELECT = "select";
var START = "start";
function Controle() {
    this.pressionadas = [];
    this.disparadas = [];
    this.funcoesDisparo = [];
}

Controle.prototype = {
    pressionar: function (COMANDO) {
        this.pressionadas[COMANDO] = true;
    },
    disparar: function (COMANDO) {
        this.funcoesDisparo[COMANDO]();
    },
    despressionar: function (COMANDO) {
        this.pressionadas[COMANDO] = false;
    },
    pressionada: function (COMANDO) {
        return this.pressionadas[COMANDO];
    },
    disparou: function (COMANDO, acao) {
        this.funcoesDisparo[COMANDO] = acao;
    }
};

