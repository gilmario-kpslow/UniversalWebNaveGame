function App() {
    this.tela;
    this.canvas;
    this.contexto;
    this.imagensCarregadas = 0;
    this.totalImagens = 0;
    this.controle;
    this.conexao;
    this.menu;
    this.navea;
    this.naveb;
    this.navec;
    this.naved;
    this.imagens = {
        nave1: "nave.svg",
        nave2: "nave.svg",
        nave3: "nave.svg",
        nave4: "nave.svg",
        fundoEspaco: "fundo-espaco.png",
        fundoEstrelas: "fundo-estrelas.png",
        fundoNuvens: "fundo-nuvens.png"};
//    this.imagens = new Array("nave.svg", "naveb.svg", "navec.svg", "naved.svg", "enimigo1.svg", "explosao1");
    this.audio = {
        principal: "musica-acao.mp3",
        tiro: "tiro.mp3",
        explosao: "explosao.mp3"
    };
}

App.prototype = {
    preparar: function () {
        this.tela = new Tela(800, 600);
        this.criaCanvas();
        this.carregaResources();
    },
    criaCanvas: function () {
        var body = document.querySelector("body");
        body.style.paddingLeft = this.tela.margemEsquerda + "px";
        body.innerHTML = "<canvas width='" + this.tela.largura + "' height='" + this.tela.altura + "' id='canvas'></canvas>" + body.innerHTML;
        this.canvas = document.getElementById("canvas");
        this.contexto = this.canvas.getContext("2d");
    },
    carregando: function () {
        var app = this;
        this.imagensCarregadas++;
        this.contexto.save();
        this.contexto.fillStyle = "blue";
        this.contexto.fillRect(0, 0, this.tela.altura, this.tela.largura);
        this.contexto.fillStyle = "white";
        this.contexto.font = "50pt sans-serif";
        this.contexto.fillText("Carregando", 115, 200);
        var tamanho = this.imagensCarregadas / this.imagens.length * 500;
        this.contexto.fillStyle = "gold";
        this.contexto.fillRect(50, 250, tamanho, 40);
        if (this.totalImagens == this.imagensCarregadas) {
            app.iniciar();
        }
        this.contexto.restore();
    },
    carregaResources: function () {
        var app = this;
        for (var i in this.imagens) {
            var img = new Image();
            img.src = "img/" + this.imagens[i];
            img.onload = function () {
                app.carregando();
            };
            this.imagens[i] = img;
            this.totalImagens++;
        }
        for (var i in this.audio) {
            var audio = new Audio();
            audio.src = "snd/" + this.audio[i];
            audio.volume = 0.5;
            audio.load();
            this.audio[i] = audio;
        }
    },
    iniciar: function () {
        this.audio.principal.play();
        this.abrirConexao();
        this.contexto.save();

        this.contexto.fillStyle = "green";
        this.contexto.fillRect(0, 0, this.tela.altura, this.tela.largura);
        this.contexto.fillStyle = "black";
        this.contexto.font = "50pt sans-serif";
        this.contexto.fillText("Restaurando", 115, 200);
        this.contexto.fillText("Dados", 220, 260);
        this.contexto.restore();
//        this.animacao = new Animacao(this.contexto);
//        var i = new Image();
//        i.src = "img/nave.svg";
//        var nave = new Nave(this.contexto, i);
//        this.animacao.novoSprite(nave);
//        this.animacao.ligar();

    },
    abrirConexao: function () {
        var app = this;
        this.conexao = new Conexao(window.location.host + "/servidor/nave/", "espectador", "0");
        this.conexao.onMessage = function (dados) {
            app.recebeDados(dados);
        };
        this.conexao.conectar();
    },
    recebeDados: function (dados) {
        var i = JSON.parse(dados);
        var app = i.valor;
        if (i.tipo == RESTAURAR || i.tipo == INICIAR) {
            this.desenhaFundo(app.fundoEspaco);
            this.desenhaFundo(app.fundoNuvens);
            this.desenhaFundo(app.fundoEstrelas);

        }
    },
    desenhaFundo: function (fundo) {
        this.contexto.save();
        var img = this.imagens[fundo.imagem];
        this.contexto.drawImage(img, 0, fundo.y, img.width, img.height);
        this.contexto.drawImage(img, 0, fundo.posicaoEmenda, img.width, img.height);
        this.contexto.restore();
    }

};

try {
    var app = new App();
    app.preparar();
} catch (e) {
    alert(e);
    throw e;
}

