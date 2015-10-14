package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Posicao implements IsJsonObject {

    private final Integer x;
    private final Integer y;

    public Posicao(Integer x, Integer y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        return builder.add("x", x).add("y", y).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
