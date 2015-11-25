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
        this.contexto.fillRect(400, 30, 50, 50);
        this.contexto.fillRect(470, 30, 50, 50);
        this.contexto.strokeStyle = "#F00";
        this.contexto.font = "30px sans-serif";
        this.contexto.fillStyle = "#FFF";
        this.contexto.fillText(" " + this.pontuacao01, 410, 65);
        this.contexto.fillText(" " + this.pontuacao02, 480, 65);
        this.contexto.restore();
    }
};