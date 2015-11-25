function Ovni(contexto, imagem, imgExplosao) {
    this.contexto = contexto;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgExplosao = imgExplosao;
}
Ovni.prototype = {
    atualizar: function () {
        this.y += this.velocidade * this.animacao.decorrido / 1000;
        if (this.y > this.contexto.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        this.contexto.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    },
    retangulosColisao: function () {
        var r = [{x: this.x + 20, y: this.y + 1, largura: 25, altura: 10},
            {x: this.x + 2, y: this.y + 11, largura: 60, altura: 12},
            {x: this.x + 20, y: this.y + 23, largura: 25, altura: 7}];

        //for (var i in r) {
//            this.contexto.strokeRect(r[i].x, r[i].y, r[i].largura, r[i].altura);
//        }
        return r;
    },
    colidiuCom: function (outro) {
        if (outro instanceof Tiro) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);
            var explosao = new Explosao(this.contexto, this.imgExplosao, this.x, this.y);
            this.animacao.novoSprite(explosao);
        }
    }
};