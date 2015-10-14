function AppControle() {
    this.controle;
    this.conexao;
    this.btn_r;
    this.btn_l;
    this.btn_start;
    this.btn_select;
    this.btn_acao_a;
    this.btn_acao_b;
    this.btn_direcao_direita;
    this.btn_direcao_esquerda;
    this.btn_direcao_subir;
    this.btn_direcao_descer;
    this.tela;
    this.div_direcional;
    this.div_central;
    this.div_acao;
    this.div_superior;
    this.btnlogar;
}

AppControle.prototype = {
    iniciar: function () {
        this.tela = window.screen;
        this.btn_l = document.getElementById("btn_l");
        this.btnlogar = document.getElementById("btnlogar");
        this.btn_r = document.getElementById("btn_r");
        this.btn_direcao_descer = document.getElementById("btn_direcao_descer");
        this.btn_direcao_subir = document.getElementById("btn_direcao_subir");
        this.btn_direcao_direita = document.getElementById("btn_direcao_direita");
        this.btn_direcao_esquerda = document.getElementById("btn_direcao_esquerda");
        this.btn_acao_a = document.getElementById("btn_acao_a");
        this.btn_acao_b = document.getElementById("btn_acao_b");
        this.btn_start = document.getElementById("btn_start");
        this.btn_select = document.getElementById("btn_select");
        this.btn_direcional = document.getElementsByClassName("direcional");
        this.div_direcional = document.getElementById("div_direcional");
        this.div_central = document.getElementById("div_central");
        this.div_acao = document.getElementById("div_acao");
        this.div_superior = document.getElementById("div_superior");
        this.div_login = document.getElementById("login");
        this.div_controle = document.getElementById("controle");
        this.adicionarComandos();
        this.ajustarTela();
    }, conectar: function () {
        var app = this;
        var nome = document.getElementById("usuario").value;
        var imagem = document.getElementById("imagem").value;
        this.conexao = new Conexao(window.location.host, nome, imagem);
        this.conexao.onConect = function () {
            app.conectou();
        };
        this.conexao.conectar();
    }, adicionarComandos: function () {
        var app = this;
        this.btnlogar.addEventListener("click", function () {
            app.conectar();
        });
        this.adicionaAcoes(this.btn_direcao_subir, COMANDO_SUBIR);
        this.adicionaAcoes(this.btn_direcao_descer, COMANDO_DECER);
        this.adicionaAcoes(this.btn_direcao_esquerda, COMANDO_ESQUERDA);
        this.adicionaAcoes(this.btn_direcao_direita, COMANDO_DIREITA);
        this.adicionaAcoes(this.btn_acao_a, ACAO_01, true);
        this.adicionaAcoes(this.btn_acao_b, ACAO_02, true);
        this.adicionaAcoes(this.btn_l, BOTAO_L, true);
        this.adicionaAcoes(this.btn_r, BOTAO_R, true);
        this.adicionaAcoes(this.btn_select, SELECT, true);
        this.adicionaAcoes(this.btn_start, START, true);
    }, adicionaAcoes: function (botao, COMANDO, disparada) {
        var app = this;
        var comando = new Comando(COMANDO, disparada);
        var info = new Informacao();
        info.tipo = CONTROLE;
        info.valor = comando;
        botao.addEventListener("touchstart", function () {
            app.conexao.enviar(JSON.stringify(info));
        });
        if (!disparada) {
            botao.addEventListener("touchend", function () {
                app.conexao.enviar(JSON.stringify(info));
            });
        }
    }, conectou: function () {
        this.div_login.style.display = "none";
        this.div_controle.style.display = "block";
    }, ajustarTela: function () {
        this.div_superior.style.height = this.tela.height * 0.12 + "px";
        this.div_superior.style.padding = "2px";
        this.btn_l.width = this.tela.width * 0.2;
        this.btn_r.width = this.tela.width * 0.2;

        this.btn_acao_a.width = this.tela.width * 0.33 * 0.40;
        this.btn_acao_b.width = this.tela.width * 0.33 * 0.40;
        this.btn_acao_b.style.paddingTop = this.tela.height * 0.30 + "px";
        this.btn_acao_a.style.paddingTop = this.tela.height * 0.30 + "px";

        this.div_direcional.style.width = this.tela.width * 0.35 + "px";
        this.div_central.style.width = this.tela.width * 0.29 + "px";
        this.div_acao.style.width = this.tela.width * 0.35 + "px";

        this.btn_start.width = this.tela.width * 0.33 * 0.40;
        this.btn_select.width = this.tela.width * 0.33 * 0.40;
        this.btn_start.style.paddingTop = this.tela.height * 0.40 + "px";
        this.btn_select.style.paddingTop = this.tela.height * 0.40 + "px";

        for (var i in this.btn_direcional) {
            this.btn_direcional[i].width = this.tela.width * 0.33 * 0.33;
        }
    }
};

try {
    var app = new AppControle();
    app.iniciar();
} catch (e) {
    alert(e);
}