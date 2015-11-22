function Painel(contexto, game) {
    this.contexto = contexto;
    this.pontuacao = 0;
    this.game = game;
    this.pontuacao01 = 0;
    this.pontuacao02 = 0;
}

Painel.prototype = {
    restaurar: function (painel) {
        this.pontuacao01 = painel.pontuacao01;
        this.pontuacao02 = painel.pontuacao02;
    },
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
        this.contexto.strokeStyle = "#00F";
        this.contexto.fillStyle = "#000";
        //this.contexto.strokeRect(80, 60, 200, 20);
        this.contexto.fillRect(80, 60, 200, 20);
        this.contexto.strokeStyle = "#000";
        this.contexto.font = "10px sans-serif";
        this.contexto.fillText("PJ1 " + this.pontuacao01, 300, 70);
        this.contexto.fillText("PJ2 " + this.pontuacao02, 400, 70);
        this.contexto.restore();
    }
};