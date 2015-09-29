package service;

import java.util.HashMap;
import java.util.Map;
import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author gilmario
 */
@ServerEndpoint("/websocket/{usuario}")
public class ServidorWebsocket {

    private static final Map<Session, String> usuarios = new HashMap<>();

    @OnMessage
    public void onMessage(Session session, String msg) {
        enviaMensagemATodos(msg);
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam("usuario") String nome, @PathParam("cor") String cor) {
        enviaMensagemATodos("algem se conectou");
        usuarios.put(session, nome);

    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        usuarios.remove(session);
    }

    private void enviaTexto(Session s, String texto) {
        try {
            s.getBasicRemote().sendText(texto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void enviaMensagemATodos(String mensagem) {
        for (Map.Entry<Session, String> entry : usuarios.entrySet()) {
            Session session = entry.getKey();
            enviaTexto(session, mensagem);
        }
    }

}
