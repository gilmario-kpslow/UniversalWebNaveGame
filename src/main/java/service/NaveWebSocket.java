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
import service.nave.Expectador;
import service.nave.Jogador;
import service.nave.Nave;
import service.nave.NaveGame;
import service.util.Comando;
import service.util.Informacao;
import service.util.Listener;

/**
 *
 * @author gilmario
 */
@ServerEndpoint("/nave/{usuario}/{nave}")
public class NaveWebSocket {

    private static final Map<Session, Expectador> expectadores = new HashMap<>();
    private static final Map<Session, Jogador> jogadores = new HashMap<>();
    private static final NaveGame game = new NaveGame();

    public NaveWebSocket() {
        game.adicionaProcesasamento(new Listener() {

            @Override
            public void executa() {
                Informacao i = new Informacao(Informacao.RESTAURAR, game.getJsonObject());
                enviaMensagens(i.toJson(), expectadores);
            }
        });
    }

    @OnMessage
    public void onMessage(Session session, String msg) {
        Informacao info = new Informacao();
        info.restoreFromJson(gerarInformacao(msg));
        if (info.getTipo().equals("controle")) {
            Comando c = new Comando(info.getJsonObject().getJsonObject("valor"));
            enviaMensagens(c.getComando().geraResposta(game, c), expectadores);
        }
    }

    private JsonObject gerarInformacao(String json) {
        JsonReader reader = Json.createReader(new StringReader(json));
        return reader.readObject();
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam("usuario") String nome, @PathParam("nave") String nave) {
        if (nome.equals("espectador")) {
            expectadores.put(session, new Expectador());
            inicializaExpectador(session);
        } else {
            Jogador j = new Jogador(nome, new Nave(nave));
            game.setJogador(j);
            if (jogadores.containsValue(j)) {
                for (Map.Entry<Session, Jogador> entry : jogadores.entrySet()) {
                    Session s = entry.getKey();
                    Jogador jog = entry.getValue();
                    if (jog.getNome().equals(j.getNome())) {
                        jogadores.remove(s);
                        jogadores.put(session, jog);
                        return;
                    }
                }
            } else {
                jogadores.put(session, j);
            }
//            enviaMensagens(new Informacao(Informacao.USUARIO, game.getJsonObject()).toJson(), expectadores);
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        expectadores.remove(session);
        Jogador j = jogadores.remove(session);
        game.remJogador(j);
//        enviaMensagens(new Informacao(Informacao.USUARIO, game.getJsonObject()).toJson(), expectadores);
        if (j != null) {
//            enviaMensagens(new Informacao(Informacao.REM_USUARIO, new Resposta(j.getNome()).getJsonObject()).toJson(), expectadores);;
        }
    }

    private void inicializaExpectador(Session sessao) {
        Informacao i = new Informacao(Informacao.RESTAURAR, game.getJsonObject());
        enviaTexto(sessao, i.toJson());
    }

    private void enviaTexto(Session s, String texto) {
        try {
            s.getBasicRemote().sendText(texto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void enviaMensagens(String mensagem, Map<Session, Expectador> map) {
        for (Map.Entry<Session, Expectador> entry : map.entrySet()) {
            Session session = entry.getKey();
            enviaTexto(session, mensagem);
        }
    }

}
