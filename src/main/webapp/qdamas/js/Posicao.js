function Posicao(cor, x, y, tabuleiro, contexto) {
    this.x = x;
    this.y = y;
    this.cor = cor;
    this.peca;
    this.selecionada = false;
    this.tabuleiro = tabuleiro;
    this.contexto = contexto;
}

Posicao.prototype = {
    restaurar: function (objeto) {
        this.x = objeto.x;
        this.y = objeto.y;
        this.cor = objeto.cor;
        this.tamanho = objeto.tamanho;
        this.selecionada = objeto.selecionada;
        if (objeto.peca) {
            if (!this.peca) {
                this.peca = new Peca(this.contexto, this.tabuleiro.game.pegarJogador(objeto.peca.jogador.nome));
            }
//            this.peca.restaurar(objeto.peca);
        }
    },
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.fillStyle = this.cor;
        this.contexto.fillRect(this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);

        if (this.peca) {
            this.contexto.drawImage(this.peca.jogador.imagem, this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);
            if (this.selecionada) {
                this.contexto.lineWidth = 5;
                this.contexto.strokeStyle = "#FF0000";
                this.contexto.strokeRect(this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);
            }
        }
        this.contexto.restore();
    }, adicionaPeca: function (peca) {
        this.peca = peca;
    }, removePeca: function () {
        this.peca = null;
    }
};

