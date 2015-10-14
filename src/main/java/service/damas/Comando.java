package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Comando implements IsJsonObject {

    private ComandoControle comando;
    private boolean disparou;

    public Comando(ComandoControle comando, boolean disparou) {
        this.comando = comando;
        this.disparou = disparou;
    }

    public Comando(JsonObject o) {
        this.restoreFromJson(o);
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        return builder.add("comando", comando.toString()).add("disparou", disparou).build();
    }

    @Override
    public void restoreFromJson(JsonObject o) {
        this.comando = ComandoControle.valueOf(o.getString("comando"));
        this.disparou = o.getBoolean("disparou");
    }

}
