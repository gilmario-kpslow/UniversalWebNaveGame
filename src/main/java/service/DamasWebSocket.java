package service;

import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import service.damas.Comando;
import service.damas.Informacao;
import service.damas.Jogador;
import service.damas.QdamasGame;
import service.damas.Resposta;

/**
 *
 * @author gilmario
 */
@ServerEndpoint("/damassoket/{usuario}/{imagem}")
public class DamasWebSocket {

    private static final Map<Session, Jogador> expectadores = new HashMap<>();
    private static final Map<Session, Jogador> jogadores = new HashMap<>();
    private static final QdamasGame game = new QdamasGame();

    @OnMessage
    public void onMessage(Session session, String msg) {
        Informacao info = new Informacao();
        info.restoreFromJson(gerarInformacao(msg));
        if (info.getTipo().equals("controle")) {
            Comando c = new Comando(info.getJsonObject().getJsonObject("valor"));
            enviaMensagens(c.getComando().geraResposta(game), expectadores);
        }
//        enviaMensagemATodos(info.toJson());
    }

    private JsonObject gerarInformacao(String json) {
        JsonReader reader = Json.createReader(new StringReader(json));
        return reader.readObject();
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam("usuario") String nome, @PathParam("imagem") Integer imagem) {
        Jogador j = new Jogador();
        j.setImagem(imagem);
        j.setNome(nome);
        if (nome.equals("espectador")) {
            expectadores.put(session, j);
            inicializaExpectador(session);
        } else {
            jogadores.put(session, j);
            game.setJogador(j);
            enviaMensagens(new Informacao(Informacao.USUARIO, j.getJsonObject()).toJson(), expectadores);
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        expectadores.remove(session);
        Jogador j = jogadores.remove(session);
        if (j != null) {
            enviaMensagens(new Informacao(Informacao.REM_USUARIO, new Resposta(j.getNome()).getJsonObject()).toJson(), expectadores);
        }
    }

    private void inicializaExpectador(Session sessao) {
        Informacao i = new Informacao(Informacao.INICIAR, game.getJsonObject());
        enviaTexto(sessao, i.toJson());
    }

    private void enviaTexto(Session s, String texto) {
        try {
            s.getBasicRemote().sendText(texto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void enviaMensagens(String mensagem, Map<Session, Jogador> map) {
        for (Map.Entry<Session, Jogador> entry : map.entrySet()) {
            Session session = entry.getKey();
            enviaTexto(session, mensagem);
        }
    }

}