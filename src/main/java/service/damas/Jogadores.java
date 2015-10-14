package service.damas;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;

/**
 *
 * @author gilmario
 */
public class Jogadores implements IsJsonObject {

    private final List<Jogador> jogadores;

    public Jogadores() {
        this.jogadores = new ArrayList<>();
    }

    public Jogadores(Jogador... jogadores) {

        this.jogadores = Arrays.asList(jogadores);
    }

    public void adicionaJogador(Jogador j) {
        jogadores.add(j);
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        JsonArrayBuilder arrayBuider = Json.createArrayBuilder();
        for (Jogador j : jogadores) {
            arrayBuider.add(j.getJsonObject());
        }
        arrayBuider.add(JsonValue.NULL);
        return buider.add("jogadores", arrayBuider).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
