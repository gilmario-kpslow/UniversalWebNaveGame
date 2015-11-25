package service.damas;

import service.util.IsJsonObject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Peca implements IsJsonObject {

    private Jogador jogador;
    private boolean dama;

    public Peca() {
    }

    public Peca(Jogador jogador) {
        this.jogador = jogador;
    }

    public Jogador getJogador() {
        return jogador;
    }

    public boolean isDama() {
        return dama;
    }

    public void setDama() {
        dama = true;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("dama", dama).add("jogador", jogador.getJsonObject()).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {

    }

}
