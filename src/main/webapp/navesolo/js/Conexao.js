function Conexao(host, player) {
    this.host = host;
    this.nomePlayer = player;
    this.socket;
    this.onMessage = null;
    this.onConect = null;
}

Conexao.prototype = {
    conectar: function () {
        var con = this;
        this.socket = new WebSocket("ws://" + this.host + "/" + this.nomePlayer);
        this.socket.onmessage = (function (evt) {
            if (con.onMessage) {
                con.onMessage(evt.data);
            }
        });

        this.socket.onerror = (function (evt) {
            con.erro(evt);
        });
        this.socket.onopen = (function () {
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