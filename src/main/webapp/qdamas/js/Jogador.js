function Jogador(contexto, imagem, nome, x, y, cor, numero, imagem2) {
    this.contexto = contexto;
    this.x = x;
    this.y = y;
    this.imagem = imagem;
    this.imagem2 = imagem2;
    this.cor = cor;
    this.nome = nome;
    this.status = STATUS_AGUARDANDO;
    this.numero = numero;
}

Jogador.prototype = {
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.drawImage(this.imagem, this.x, this.y + 5, 40, 40);
        this.contexto.fillText(this.nome, this.x + 5, this.y + 5);
        //this.contexto.fillText(this.status, this.x + 5, this.y + 50);
        this.contexto.restore();
    }
};


