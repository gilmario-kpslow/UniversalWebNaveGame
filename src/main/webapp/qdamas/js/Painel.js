function Painel(contexto, game) {
    this.contexto = contexto;
    this.pontuacao = 0;
    this.game = game;
}

Painel.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        if (this.game.jogador01) {
            this.game.jogador01.desenhar();
        }
        if (this.game.jogador02) {
            this.game.jogador02.desenhar();
        }
        this.contexto.restore();
    }
};