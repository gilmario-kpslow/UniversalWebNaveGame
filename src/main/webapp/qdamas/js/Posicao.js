function Posicao(cor, x, y, tabuleiro, contexto) {
    this.x = x;
    this.y = y;
    this.cor = cor;
    this.peca;
    this.selecionada = false;
    this.corSelecionada = "#000";
    this.marcado = false;
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
        this.corSelecionada = objeto.corSelecionada;
        this.marcado = objeto.marcado;
        if (objeto.peca) {
            if (!this.peca) {
                this.peca = new Peca(this.contexto, this.tabuleiro.game.pegarJogador(objeto.peca.jogador.nome));
            }
        }
    },
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        if (this.marcado) {
            this.contexto.fillStyle = "#CCC";
            this.contexto.fillRect(this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);
        } else {
            this.contexto.fillStyle = this.cor;
            this.contexto.fillRect(this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);
        }
        if (this.peca) {
            if (this.peca.dama) {
                this.contexto.drawImage(this.peca.jogador.imagemDama, this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);
            } else {
                this.contexto.drawImage(this.peca.jogador.imagem, this.x, this.y, this.tabuleiro.tamanho, this.tabuleiro.tamanho);
            }
        }
        if (this.selecionada) {
            this.contexto.lineWidth = 3;
            this.contexto.strokeStyle = this.corSelecionada;
            this.contexto.strokeRect(this.x + 1.5, this.y + 1.5, this.tabuleiro.tamanho - 3, this.tabuleiro.tamanho - 3);
        }
        this.contexto.restore();
    }
};

