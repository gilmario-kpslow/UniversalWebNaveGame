function Colisor() {
    this.sprites = [];
    this.aoColidir = null;
    this.spritesExcluir = [];
}

Colisor.prototype = {
    novoSprite: function (sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    processar: function () {
        var testados = new Object();
        for (var i in this.sprites) {
            for (var j in this.sprites) {
                if (i == j) {
                    continue;
                }
                var id1 = this.stringUnica(this.sprites[i]);
                var id2 = this.stringUnica(this.sprites[j]);
                if (!testados[id1]) {
                    testados[id1] = [];
                }
                if (!testados[id2]) {
                    testados[id2] = [];
                }

                if (!(testados[id1].indexOf(id2) >= 0 || testados[id2].indexOf(id1) >= 0)) {
                    this.testarColisoes(this.sprites[i], this.sprites[j]);
                    testados[id1].push(id2);
                    testados[id2].push(id1);
                }

            }
        }
        this.processarExclusoes();
    },
    testarColisoes: function (spriteA, spriteB) {
        var rest1 = spriteA.retangulosColisao();
        var rest2 = spriteB.retangulosColisao();
        colisoes:
                for (var i in rest1) {
            for (var j in rest2) {
                if (this.retangulosColidem(rest1[i], rest2[j])) {
                    spriteA.colidiuCom(spriteB);
                    spriteB.colidiuCom(spriteA);
                    if (this.aoColidir) {
                        this.aoColidir(spriteA, spriteB);
                    }
                    break colisoes;
                }
            }
        }
    },
    retangulosColidem: function (ret1, ret2) {
        var a = (ret1.x + ret1.largura) > ret2.x;
        var b = ret1.x < (ret2.x + ret2.largura);
        var c = (ret1.y + ret1.altura) > ret2.y;
        var d = ret1.y < (ret2.y + ret2.largura);

        return a && b && c && d;
    },
    stringUnica: function (sprite) {
        var str = "";
        var retangulos = sprite.retangulosColisao();
        for (var i in retangulos) {
            str += 'x:' + retangulos[i].x + ',' +
                    'y:' + retangulos[i].y + ',' +
                    'l:' + retangulos[i].largura + ',' +
                    'a:' + retangulos[i].altura + "\n";
        }
        return str;
    },
    excluirSprite: function (sprite) {
        this.spritesExcluir.push(sprite);
    },
    processarExclusoes: function () {
        var novoArray = [];
        for (var i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) {
                novoArray.push(this.sprites[i]);
            }
        }
        this.spritesExcluir = [];
        this.sprites = novoArray;
    }
};