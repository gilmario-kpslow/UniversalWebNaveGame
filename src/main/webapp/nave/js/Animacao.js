function Animacao(contexto) {
    this.sprites = [];
    this.ligado = false;
    this.contexto = contexto;
    this.processamentos = [];
    this.processamentosExcluir = [];
    this.spritesExcluir = [];
    this.ultimoCiclo = 0;
    this.decorrido = 0;
}

Animacao.prototype = {
    novoSprite: function (sprite) {
        this.sprites.push(sprite);
        sprite.animacao = this;
    },
    ligar: function () {
        this.ultimoCiclo = 0;
        this.ligado = true;
        this.proximoFrame();
    },
    desligar: function () {
        this.ligado = false;
    },
    proximoFrame: function () {
        if (!this.ligado) {
            return;
        }
        var agora = new Date().getTime();
        if (this.ultimoCiclo == 0) {
            this.ultimoCiclo = agora;
        }
        this.decorrido = agora - this.ultimoCiclo;

        for (var i in this.sprites) {
            this.sprites[i].atualizar();
        }
        for (var i in this.sprites) {
            this.sprites[i].desenhar();
        }
        for (var i in this.processamentos) {
            this.processamentos[i].processar();
        }
        this.processarExclusoes();


        this.ultimoCiclo = agora;
        var animacao = this;
        requestAnimationFrame(function () {
            animacao.proximoFrame();
        });
    },
    limparTela: function () {
        this.contexto.clearRect(0, 0, this.contexto.canvas.width, this.contexto.canvas.height);
    },
    novoProcessamento: function (processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    },
    excluirSprite: function (sprite) {
        this.spritesExcluir.push(sprite);
    },
    excluirProcessamento: function (processamento) {
        this.processamentosExcluir.push(processamento);
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

        var novosProce = [];
        for (var i in this.processamentos) {
            if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1) {
                novosProce.push(this.processamentos[i]);
            }
        }
        this.processamentosExcluir = [];
        this.processamentos = novosProce;
    }

};