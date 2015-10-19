function Tabuleiro(contexto, game) {
    this.contexto = contexto;
    this.tela;
    this.tamanho = 50;
//    this.pecas = [];
    this.posicoes;
//    this.casasPretas = [];
//    this.casaSelecionada01;
//    this.casaSelecionada02;
    this.game = game;
}

Tabuleiro.prototype = {
    restaurar: function (tabuleiro) {
        this.tela = new Tela(tabuleiro.tela.altura, tabuleiro.tela.largura);
        this.tamanho = tabuleiro.tamanho;
        this.restaurarPosicoes(tabuleiro.posicoes);

    },
    restaurarPosicoes: function (posicoes) {
        this.posicoes = [];
        for (var i = 0; i < posicoes.length; i++) {
            var p = posicoes[i];
            var pos = new Posicao(p.cor, p.x, p.y, this, this.contexto);
            pos.restaurar(p);
            pos.tabuleiro = this;
            this.posicoes.push(pos);
            this.animacao.novoSprite(pos);
        }
    }
    ,
    atualizar: function () {

    },
    desenhar: function () {
        // Desenhar as bordas com letras acima e numeros nas laterais
//        var medianaW = (this.tela.largura - (this.tamanho * 8)) / 2;
//        var medianaH = (this.tela.altura - (this.tamanho * 8)) / 2;
//        this.context.save();
//        this.context.strokeRect(medianaW, medianaH, this.tamanho * 8, this.tamanho * 8);
//        for (var i = 0; i < 8; i++) {
//            for (var j = 0; j < 8; j++) {
////                if ((j + i) % 2 === 1) {
////                    this.context.fillStyle = "#333";
////                } else {
////                    this.context.fillStyle = "#FFF";
////                    var posicao = new Posicao((j * this.tamanho) + (this.tela.largura - (this.tamanho * 8)) / 2, (i * this.tamanho) + (this.tela.altura - (this.tamanho * 8)) / 2, this.context);
////                    if (this.casasPretas.length <= 31) {
////                        this.casasPretas.push(posicao);
////                        this.animacao.novoSprite(posicao);
////                    }
////                }
////                this.context.fillRect((j * this.tamanho) + (this.tela.largura - (this.tamanho * 8)) / 2, (i * this.tamanho) + (this.tela.altura - (this.tamanho * 8)) / 2, this.tamanho, this.tamanho);
//            }
//        }
//        this.context.restore();
        this.desenhaCantos();

    },
    desenhaCantos: function () {
        this.contexto.save();
        var medianaW = (this.tela.largura - (this.tamanho * 8)) / 2;
        var medianaH = (this.tela.altura - (this.tamanho * 8)) / 2;
        this.contexto.strokeRect(medianaW - 20, medianaH - 20, (this.tamanho * 8) + 40, (this.tamanho * 8) + 40);
        var letras = new Array("A", "B", "C", "D", "E", "F", "G", "J");
        var numeros = new Array("1", "2", "3", "4", "5", "6", "7", "8");
        for (var a = 0; a < letras.length; a++) {
            var x = medianaW + (this.tamanho * (a + 1)) - this.tamanho / 2;
            this.contexto.fillText(letras[a], x, medianaH - 5);
        }
        for (var a = 0; a < letras.length; a++) {
            var x = medianaW + (this.tamanho * (a + 1)) - this.tamanho / 2;
            this.contexto.fillText(letras[a], x, this.tela.altura - medianaH + 12);
        }
        for (var a = 0; a < numeros.length; a++) {
            var y = medianaH + (this.tamanho * (a + 1)) - this.tamanho / 2;
            this.contexto.fillText(numeros[a], medianaW - 13, y);
        }
        for (var a = 0; a < numeros.length; a++) {
            var y = medianaH + (this.tamanho * (a + 1)) - this.tamanho / 2;
            this.contexto.fillText(numeros[a], this.tela.largura - medianaW + 8, y);
        }
        this.contexto.restore();
    }, posicionarPecas: function (jogador) {
        if (this.jogador01 == null) {
            this.jogador01 = jogador;
            this.adicionarPecas(this.jogador01, 0);
            this.casasPretas[0].selecionada = true;
        } else if (this.jogador02 == null) {
            this.jogador02 = jogador;
            this.adicionarPecas(this.jogador02, 20);
            this.casasPretas[31].selecionada = true;
        }
    }, adicionarPecas: function (jogador, posicaoInicial) {
        for (var i = 0; i < 12; i++) {
            this.casasPretas[i + posicaoInicial].adicionaPeca(new Peca(this.context, jogador));
        }
    }, move: function (jogador) {
        if (jogador.nome == this.jogador01.nome) {
            if (!this.casaSelecionada01) {
                this.casaSelecionada01 = this.casasPretas[0];
            } else {
                var i = this.casasPretas.indexOf(this.casaSelecionada01);
                this.casaSelecionada01 = this.casasPretas[i + 1];
            }

        }
    }

};


