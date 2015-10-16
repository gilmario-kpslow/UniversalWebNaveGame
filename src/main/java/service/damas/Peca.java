package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Peca implements IsJsonObject {

    private Jogador jogador;

    public Peca() {
    }

    public Peca(Jogador jogador) {
        this.jogador = jogador;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("jogador", jogador.getJsonObject()).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {

    }

}
