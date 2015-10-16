package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Posicao implements IsJsonObject {

    private Peca peca;
    private int x;
    private int y;
    private String cor;

    public Posicao(String cor, int x, int y) {
        this.x = x;
        this.y = y;
        this.cor = cor;

    }

    public void posicionaPeca(Peca p) {
        this.peca = p;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        if (peca != null) {
            builder.add("peca", this.peca.getJsonObject());
        }
        return builder.add("cor", cor).add("x", x).add("y", y).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {

    }

}
