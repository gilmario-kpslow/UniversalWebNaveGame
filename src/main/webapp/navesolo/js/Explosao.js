function Explosao(contexto, imagem, x, y) {
    this.contexto = contexto;
    this.imagem = imagem;
    this.x = x;
    this.y = y;
    this.fimDaExplosao = null;
    this.spritsheet = new Spritsheet(contexto, imagem, 1, 5);
    this.spritsheet.intervalo = 75;
    var explosao = this;
    this.spritsheet.fimDoCiclo = function () {
        explosao.animacao.excluirSprite(explosao);
        if (explosao.fimDaExplosao) {
            explosao.fimDaExplosao();
        }
    };
    SOM_EXPLOSAO.currentTime = 0.0;
    SOM_EXPLOSAO.play();
}

Explosao.prototype = {
    atualizar: function () {
    },
    desenhar: function () {
        this.spritsheet.desenhar(this.x, this.y);
        this.spritsheet.proximoQuadro();
    }
};