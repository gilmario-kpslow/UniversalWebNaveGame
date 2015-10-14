function Posicao(x, y, contexto) {
    this.x = x;
    this.y = y;
    this.peca;
    this.selecionada = false;
    this.contexto = contexto;
}

Posicao.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        if (this.peca) {
            this.contexto.drawImage(this.peca.jogador.imagem, this.x, this.y, 47, 47);
            if (this.selecionada) {
                this.contexto.lineWidth = 5;
                this.contexto.strokeStyle = "#FF0000";
                this.contexto.strokeRect(this.x, this.y, 50, 50);
            }
        }
        this.contexto.restore();
    }, adicionaPeca: function (peca) {
        this.peca = peca;
    }, removePeca: function () {
        this.peca = null;
    }
};

