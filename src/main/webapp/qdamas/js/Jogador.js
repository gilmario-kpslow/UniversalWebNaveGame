function Jogador(contexto, imagem, nome) {
    this.contexto = contexto;
    this.x = 0;
    this.y = 0;
    this.imagem = imagem;
    this.nome = nome;
    this.status = STATUS_AGUARDANDO;
}

Jogador.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.drawImage(this.imagem, this.x, this.y + 5, 40, 40);
        this.contexto.fillText(this.nome, this.x + 5, this.y + 5);
        this.contexto.fillText(this.status, this.x + 5, this.y + 50);
        this.contexto.restore();
    }
};


