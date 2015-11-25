function AppControle() {
    this.controle;
    this.conexao;
    this.btn_start;
    this.btn_select;
    this.btn_acao_a;
    this.btn_acao_b;
    this.btn_direcao_direita;
    this.btn_direcao_esquerda;
    this.btn_direcao_subir;
    this.btn_direcao_descer;
    this.btnlogar;
    this.jogador;
    this.imagem;

}

AppControle.prototype = {
    iniciar: function () {
        this.btnlogar = document.getElementById("btnlogar");
        this.btn_direcao_descer = document.getElementById("BUTTON_DOWN");
        this.btn_direcao_subir = document.getElementById("BUTTON_UP");
        this.btn_direcao_direita = document.getElementById("BUTTON_RIGHT");
        this.btn_direcao_esquerda = document.getElementById("BUTTON_LEFT");
        this.btn_acao_a = document.getElementById("BUTTON_A");
        this.btn_acao_b = document.getElementById("BUTTON_B");
        this.btn_start = document.getElementById("BUTTON_START");
        this.div_login = document.getElementById("login");
        this.div_controle = document.getElementById("controle");
        this.adicionarComandos();
    }, conectar: function () {
        var app = this;
        this.jogador = document.getElementById("usuario").value;
        this.imagem = document.getElementById("imagem").value;
        this.conexao = new Conexao(window.location.host + "/servidor/nave/", this.jogador, this.imagem);
        this.conexao.onConect = function () {
            app.conectou();
        };
        this.conexao.conectar();
    }, adicionarComandos: function () {
        var app = this;
        this.btnlogar.addEventListener("click", function () {
            app.conectar();
        });

    }, adicionaAcoes: function (botao, COMANDO) {
        var app = this;
        var comando = new Comando(COMANDO, app.jogador);
        var info = new Informacao();
        info.tipo = CONTROLE;
        info.valor = comando;
        botao.addEventListener("touchstart", function () {
            app.conexao.enviar(JSON.stringify(info));
        });
    }, conectou: function () {
        this.div_login.style.display = "none";
        this.div_controle.style.display = "block";
        this.adicionaAcoes(this.btn_direcao_subir, COMANDO_SUBIR);
        this.adicionaAcoes(this.btn_direcao_descer, COMANDO_DECER);
        this.adicionaAcoes(this.btn_direcao_esquerda, COMANDO_ESQUERDA);
        this.adicionaAcoes(this.btn_direcao_direita, COMANDO_DIREITA);
        this.adicionaAcoes(this.btn_acao_a, ACAO_01);
        this.adicionaAcoes(this.btn_acao_b, ACAO_02);
        this.adicionaAcoes(this.btn_start, START);
    }
};

try {
    var app = new AppControle();
    app.iniciar();
} catch (e) {
    alert(e);
}