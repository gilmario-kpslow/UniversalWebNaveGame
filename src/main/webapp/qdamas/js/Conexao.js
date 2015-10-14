function Conexao(host, player, cod) {
    this.host = host;
    this.nomePlayer = player;
    this.codImgPlayer = cod;
    this.socket;
    this.onMessage = null;
    this.onConect = null;
}

Conexao.prototype = {
    conectar: function () {
        var con = this;
        //this.socket = new WebSocket("ws://" + this.host + "/" + APP_SOCKET + "/" + this.nomePlayer + "/" + this.codImgPlayer);
        this.socket = new WebSocket("ws://" + "localhost:8080/servidor" + "/" + APP_SOCKET + "/" + this.nomePlayer + "/" + this.codImgPlayer);
        this.socket.onmessage = (function (evt) {
            if (con.onMessage) {
                con.onMessage(evt.data);
            }
        });

        this.socket.onerror = (function (evt) {
            con.erro(evt);
        });
        this.socket.onopen = (function (evt) {
            if (con.onConect) {
                con.onConect();
            }
        });
    },
    erro: function (evt) {
        alert("nao foi possivel se conectar");
    },
    enviar: function (mensagem) {
        this.socket.send(mensagem);
    }

};