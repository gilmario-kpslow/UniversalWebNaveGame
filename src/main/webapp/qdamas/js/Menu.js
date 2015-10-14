function Menu(contexto, tela) {
    this.contexto = contexto;
    this.tela = tela;
}

Menu.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.globalAlpha = 0.4;
        this.contexto.fillStyle = "#EEE";
        this.contexto.fillRect(0, 0, this.tela.largura, this.tela.altura);
        this.contexto.restore();
        this.contexto.save();
        this.contexto.font = "50px sans-serif";
        this.contexto.strokeStyle = "#FFFFFF";
        this.contexto.lineWidth = 5;
        var margem = (this.tela.largura - this.contexto.measureText("Aguardando jogadores").width) / 2;
        this.contexto.strokeText("Aguardando jogadores", margem, this.tela.altura / 2);
        this.contexto.fillText("Aguardando jogadores", margem, this.tela.altura / 2);
        this.contexto.restore();
    }
};

