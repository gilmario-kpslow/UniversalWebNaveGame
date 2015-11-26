function Tiro(contexto, nave, som) {
    this.contexto = contexto;
    this.nave = nave;
    this.largura = 3;
    this.altura = 10;
    this.x = nave.x + 18;
    this.y = nave.y - this.altura;
    this.velocidade = 400;
    this.cor = "gold";
    som.currentTime = 0.0;
    som.play();
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
