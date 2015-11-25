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
    this.imagens = new Array("peca_branca.svg", "peca_preta.svg", "peca_verde.svg", "peca_azul.svg"
            , "dama_branca.svg", "dama_preta.svg", "dama_verde.svg", "dama_azul.svg");
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
        this.tabuleiro = new Tabuleiro(this.contexto, this);
        this.controle = new Controle();
        this.menu = new Menu(this.contexto, this.tela);
        this.conexao = new Conexao(window.location.host + "/servidor/damassoket/", "espectador", 0);
        this.conexao.onMessage = function (dados) {
            app.receberConexao(dados);
        };
        this.painel = new Painel(this.contexto, app);
        this.animacao = new Animacao(this.contexto);
        this.animacao.novoSprite(this.painel);
        this.criaPersonagens();
        this.conexao.conectar();

    },
    criaPersonagens: function () {
        this.animacao.ligar();
//        this.audio.principal.play();
    },
    receberConexao: function (dados) {
        //console.log(dados);
        var informacao = JSON.parse(dados);
        if (informacao.tipo === USUARIO) {
            var game = informacao.valor;
            this.restauraJogador01(game.jogador01);
            this.restauraJogador02(game.jogador02);
            this.menu.restaurar(game.menu);
            this.painel.restaurar(game.painel);
            this.tabuleiro.restaurar(game.tabuleiro);
        } else if (informacao.tipo === INICIAR) {
            var game = informacao.valor;
            this.tabuleiro = new Tabuleiro(this.contexto, this);
            this.animacao.novoSprite(this.tabuleiro);
            this.restauraJogador01(game.jogador01);
            this.restauraJogador02(game.jogador02);
            this.tabuleiro.restaurar(game.tabuleiro);
            this.menu = new Menu(this.contexto, "Aguardando informações");
            this.menu.restaurar(game.menu);
            this.animacao.novoSprite(this.menu);
        } else if (informacao.tipo === MOVE) {
            var game = informacao.valor;
            this.tabuleiro.restaurar(game.tabuleiro);
            this.menu.restaurar(game.menu);
            this.painel.restaurar(game.painel);
        }
    },
    iniciaJogo: function () {
        if (this.painel.jogadoresProntos()) {
            this.posicionaPecas(this.painel.jogador1);
            this.posicionaPecas(this.painel.jogador2);
        }
    },
    posicionaPecas: function (j) {
        this.tabuleiro.posicionarPecas(j);
    },
    pegarJogador: function (nome) {
        if (this.jogador01.nome == nome) {
            return this.jogador01;
        } else if (this.jogador02.nome == nome) {
            return this.jogador02;
        } else {
            return null;
        }
    }, restauraJogador01: function (jogador01) {
        if (jogador01 != null) {
            this.jogador01 = new Jogador(this.contexto, this.imagens[jogador01.imagem], jogador01.nome, jogador01.x, jogador01.y, this.imagens[jogador01.imagem + 4]);
        } else {
            this.jogador01 = null;
        }
    }, restauraJogador02: function (jogador02) {
        if (jogador02 != null) {
            this.jogador02 = new Jogador(this.contexto, this.imagens[jogador02.imagem], jogador02.nome, jogador02.x, jogador02.y, this.imagens[jogador02.imagem + 4]);
        } else {
            this.jogador02 = null;
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
