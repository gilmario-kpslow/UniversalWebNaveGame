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
        this.contexto.fillStyle = "#000";
        //this.contexto.strokeRect(80, 60, 200, 20);
        this.contexto.fillRect(80, 48, 300, 25);
        this.contexto.fillStyle = "#FFF";
        this.contexto.font = "15px sans-serif";
        this.contexto.fillText(this.mensagem, 85, 65);
        this.contexto.restore();
    }
};

