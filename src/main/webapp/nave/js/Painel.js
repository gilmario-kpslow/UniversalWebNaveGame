function Painel(contexto, nave) {
    this.contexto = contexto;
    this.nave = nave;
    this.spriteshet = new Spritsheet(contexto, nave.imagem, 3, 2);
    this.spriteshet.linha = 0;
    this.spriteshet.coluna = 0;
    this.pontuacao = 0;
}

Painel.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.fillStyle = "white";
        this.contexto.font = "20px sans-serif";
        this.contexto.fillText(this.pontuacao, 80, 30);
        this.contexto.scale(0.5, 0.5);
        var x = 20;
        var y = 20;
        for (var i = 0; i < this.nave.vidas; i++) {
            this.spriteshet.desenhar(x, y);
            x += 40;
        }
        this.contexto.restore();
    }

};