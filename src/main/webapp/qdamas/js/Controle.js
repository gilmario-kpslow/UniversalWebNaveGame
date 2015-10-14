function Controle() {
    this.pressionadas = [];
    this.disparadas = [];
    this.funcoesDisparo = [];
}

Controle.prototype = {
    pressionar: function (COMANDO) {
        if (this.pressionadas[COMANDO]) {
            this.pressionadas[COMANDO] = false;
        } else {
            this.pressionadas[COMANDO] = true;
        }
    },
    disparar: function (COMANDO) {
        this.funcoesDisparo[COMANDO]();
    },
    despressionar: function (COMANDO) {
        this.pressionadas[COMANDO] = false;
    },
    pressionada: function (COMANDO) {
        return this.pressionadas[COMANDO];
    },
    disparou: function (COMANDO, acao) {
        this.funcoesDisparo[COMANDO] = acao;
    }
};

