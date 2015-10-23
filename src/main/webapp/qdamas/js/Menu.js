function Menu(contexto, mensagem) {
    this.contexto = contexto;
    this.mensagem = mensagem;

}

Menu.prototype = {
    restaurar: function (menu) {
        this.mensagem = menu.mensagem;
    },
    atualizar: function () {

    },
    desenhar: function () {
        this.contexto.save();
        this.contexto.strokeStyle = "#000";
        //this.contexto.strokeRect(80, 60, 200, 20);
        this.contexto.clearRect(80, 60, 200, 20);
        this.contexto.fillStyle = "#000";
        this.contexto.font = "10px sans-serif";
        this.contexto.fillText(this.mensagem, 80, 70);
        this.contexto.restore();
    }
};

