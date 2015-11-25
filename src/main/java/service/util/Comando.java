package service.util;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Comando implements IsJsonObject {

    private ComandoControle comando;
    private String jogador;

    public Comando(ComandoControle comando) {
        this.comando = comando;
    }

    public Comando(JsonObject o) {
        this.restoreFromJson(o);
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        return builder.add("comando", comando.toString()).build();
    }

    @Override
    public void restoreFromJson(JsonObject o) {
        try {
            this.comando = ComandoControle.restorePorNome(o.getString("comando"));
            this.jogador = o.getString("jogador");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getJogador() {
        return jogador;
    }

    public void setJogador(String jogador) {
        this.jogador = jogador;
    }

    public ComandoControle getComando() {
        return comando;
    }

    public void setComando(ComandoControle comando) {
        this.comando = comando;
    }

}
