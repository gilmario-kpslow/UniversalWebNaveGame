function Spritsheet(contexto, imagem, linhas, colunas) {
    this.contexto = contexto;
    this.imagem = imagem;
    this.linhas = linhas;
    this.colunas = colunas;
    this.intervalo = 0;
    this.linha = 0;
    this.coluna = 0;
    this.ultimoTempo;
    this.fimDoCiclo = null;
}

Spritsheet.prototype = {
    proximoQuadro: function () {
        var agora = new Date().getTime();
        if (!this.ultimoTempo) {
            this.ultimoTempo = agora;
        }
        if (agora - this.ultimoTempo < this.intervalo) {
            return;
        }
        if (this.coluna < this.colunas - 1) {
            this.coluna++;
        } else {
            this.coluna = 0;
        }
        this.ultimoTempo = agora;

        if (this.fimDoCiclo && this.coluna >= this.colunas - 1) {
            this.fimDoCiclo();
        }
    },
    desenhar: function (x, y) {
        var largura = this.imagem.width / this.colunas;
        var altura = this.imagem.height / this.linhas;
        this.contexto.drawImage(
                this.imagem,
                largura * this.coluna,
                altura * this.linha,
                largura,
                altura,
                x,
                y,
                largura,
                altura);
    }
};