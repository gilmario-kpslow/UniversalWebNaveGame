function Nave(contexto, teclado, imagem, imgExplosao) {
    this.contexto = contexto;
    this.imagem = imagem;
    this.teclado = teclado;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.vidas = 3;
    this.acabaramVidas = null;
    this.imgExplosao = imgExplosao;
    this.spritesheet = new Spritsheet(contexto, imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
}

Nave.prototype = {
    desenhar: function () {
        if (this.teclado.pressionada(SETA_ESQUERDA)) {
            this.spritesheet.linha = 1;
        } else if (this.teclado.pressionada(SETA_DIREITA)) {
            this.spritesheet.linha = 2;
        } else {
            this.spritesheet.linha = 0;
        }
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },
    atualizar: function () {
        var incremento = this.velocidade * this.animacao.decorrido / 1000;
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= incremento;
        }
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.contexto.canvas.width - 36) {
            this.x += incremento;
        }
        if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0) {
            this.y -= incremento;
        }
        if (this.teclado.pressionada(SETA_ABAIXO) && this.y < this.contexto.canvas.height - 48) {
            this.y += incremento;
        }
    },
    atirar: function () {
        var t = new Tiro(this.contexto, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    retangulosColisao: function () {
        var r = [{x: this.x + 2, y: this.y + 19, largura: 9, altura: 13},
            {x: this.x + 13, y: this.y + 3, largura: 10, altura: 33},
            {x: this.x + 25, y: this.y + 19, largura: 9, altura: 13}];
//        for (var i in r) {
//            this.contexto.strokeRect(r[i].x, r[i].y, r[i].largura, r[i].altura);
        //}
        return r;

    },
    colidiuCom: function (outro) {
        if (outro instanceof Ovni) {
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);
            var exp2 = new Explosao(this.contexto, this.imgExplosao, outro.x, outro.y);
            this.animacao.novoSprite(exp2);
            outro.y = this.contexto.canvas.height;
            var nave = this;
            var exp1 = new Explosao(this.contexto, this.imgExplosao, this.x, this.y);
            exp1.fimDaExplosao = function () {
                nave.vidas--;
                if (nave.vidas < 0) {
                    if (nave.acabaramVidas) {
                        nave.acabaramVidas();
                    }
                } else {
                    nave.colisor.novoSprite(nave);
                    nave.animacao.novoSprite(nave);
                    nave.posicionar();
                    nave.velocidade = 200;
                }
            };
            this.animacao.novoSprite(exp1);
        }
    },
    posicionar: function () {
        this.x = this.contexto.canvas.width / 2 - 18;
        this.y = this.contexto.canvas.height - 48;
    }

};
