function App() {
    this.tela;
    this.canvas;
    this.contexto;
    this.imagensCarregadas = 0;
    this.totalImagens = 0;
    this.controle;
    this.animacao;
    this.tabuleiro;
    this.conexao;
    this.menu;
    this.painel;
    this.jogador01;
    this.jogador02;
    this.imagens = new Array("peca_branca.svg", "peca_preta.svg", "peca_azul.svg", "peca_verde.svg"
            , "dama_branca.svg", "dama_preta.svg", "dama_azul.svg", "dama_verde.svg");
    this.audio = {
        principal: "musica.mp3"
    };
}

App.prototype = {
    iniciar: function () {
        this.tela = new Tela(600, 600);
        this.criaCanvas();
        this.carregarMidias();
    }, criaCanvas: function () {
        var body = document.querySelector("body");
        body.style.paddingLeft = this.tela.margemEsquerda + "px";
        body.innerHTML = "<canvas width='" + this.tela.largura + "' height='" + this.tela.altura + "' id='canvas'></canvas>" + body.innerHTML;
        this.canvas = document.getElementById("canvas");
        this.contexto = this.canvas.getContext("2d");
    }, carregarMidias: function () {
        var app = this;
        for (var i in this.imagens) {
            var img = new Image();
            img.src = "img/" + this.imagens[i];
            img.onload = function () {
                app.carregou();
            };
            this.imagens[i] = img;
            this.totalImagens++;
        }
        for (var i in this.audio) {
            var audio = new Audio();
            audio.src = "snd/" + this.audio.principal;
            audio.volume = 0.2;
            audio.load();
            this.audio.principal = audio;
        }

    }, carregou: function () {
        this.imagensCarregadas++;
        if (this.imagensCarregadas === this.totalImagens) {
            this.criaObjetos();
        }
    }, criaObjetos: function () {
        var app = this;
        this.tabuleiro = new Tabuleiro(this.contexto, this.tela);
        this.controle = new Controle();
        this.menu = new Menu(this.contexto, this.tela);
        this.conexao = new Conexao(window.location.host, "espectador", 0);
        this.conexao.onMessage = function (dados) {
            app.receberConexao(dados);
        };
        this.painel = new Painel(this.contexto);
        this.animacao = new Animacao(this.contexto);
//        this.animacao.novoSprite(this.tabuleiro);
        this.animacao.novoSprite(this.menu);
        this.animacao.novoSprite(this.painel);
        this.criaPersonagens();
        this.conexao.conectar();

    }, criaPersonagens: function () {
        this.animacao.ligar();
        this.audio.principal.play();
    }, receberConexao: function (dados) {
        console.log(dados);
        var informacao = JSON.parse(dados);
        if (informacao.tipo === USUARIO) {
            this.adicionaJogador(informacao.valor);
        } else if (informacao.tipo === REM_USUARIO) {
            this.painel.remJogador(informacao.valor.info);
        } else if (informacao.tipo === INICIAR) {
            var game = informacao.valor;
            this.tabuleiro = new Tabuleiro(this.contexto, this);
            this.tabuleiro.restaurar(game.tabuleiro);
            this.animacao.novoSprite(this.tabuleiro);
//            this.adicionaJogador(game.jogador01);
//            this.adicionaJogador(game.jogador02);

        } else if (informacao.tipo === CONTROLE) {
            this.processarComando(informacao.valor);
        } else if (informacao.tipo === MOVE) {
            this.tabuleiro.move(informacao.valor);
        }
    }, adicionaJogador: function (p) {
        if (p) {
            var jogador = new Jogador(this.contexto, this.imagens[p.imagem], p.nome);
            this.painel.setJogador(jogador);
            this.animacao.excluirSprite(this.menu);
        }

    }, iniciaJogo: function () {
        if (this.painel.jogadoresProntos()) {
            this.posicionaPecas(this.painel.jogador1);
            this.posicionaPecas(this.painel.jogador2);
        }
    }, posicionaPecas: function (j) {
        this.tabuleiro.posicionarPecas(j);
    }, processarComando: function (comando) {
        if (comando.disparou) {
            this.controle.disparar(comando.comando);
        } else {
            this.controle.pressionar(comando.comando);
        }
    }
};

try {
    var app = new App();
    app.iniciar();
} catch (e) {
    alert(e);
    throw e;
}