function Painel(contexto) {
    this.contexto = contexto;
    this.pontuacao = 0;
    this.jogador1;
    this.jogador2;
}

Painel.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        if (this.jogador1) {
            this.jogador1.desenhar();
        }
        if (this.jogador2) {
            this.jogador2.desenhar();
        }
        this.contexto.restore();
    }, setJogador: function (jogador) {
        if (!this.jogador1) {
            this.jogador1 = jogador;
            this.jogador1.x = 100;
            this.jogador1.y = 5;
        } else if (!this.jogador2) {
            this.jogador2 = jogador;
            this.jogador2.x = 200;
            this.jogador2.y = 5;
        }
    }, remJogador: function (nome) {
        if (this.jogador1.nome == nome) {
            this.jogador1 = null;
        } else if (this.jogador2.nome == nome) {
            this.jogador2 = null;
        }
    }, jogadoresProntos: function () {
        return this.jogador1 != null && this.jogador2 != null;
    }

};