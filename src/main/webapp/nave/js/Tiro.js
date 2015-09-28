function Tiro(contexto, nave, son) {
    this.contexto = contexto;
    this.nave = nave;
    this.largura = 4;
    this.altura = 20;
    this.x = nave.x + 17;
    this.y = nave.y;
    this.velocidade = 200;
    this.cor = "gold";
    SOM_TIRO.volume = 0.2;
    SOM_TIRO.play();

}

Tiro.prototype = {
    atualizar: function () {
        this.y -= this.velocidade * this.animacao.decorrido / 1000;
        if (this.y < -this.altura) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.fillStyle = this.cor;
        this.contexto.fillRect(this.x, this.y, this.largura, this.altura);
        this.contexto.restore();
    },
    retangulosColisao: function () {
        return [{x: this.x,
                y: this.y,
                largura: this.largura,
                altura: this.altura}];
    },
    colidiuCom: function (outro) {

    }
};
