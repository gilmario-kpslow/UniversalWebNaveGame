package service.damas;

import service.util.IsJsonObject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import service.nave.Resources;

/**
 *
 * @author gilmario
 */
public class Tela implements IsJsonObject {

    public int altura;
    public int largura;

    public Tela() {
        this.altura = 600;
        this.largura = 600;
    }

    public int getAltura() {
        return altura;
    }

    public int getLargura() {
        return largura;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        return builder.add("altura", altura).add("largura", largura).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {

    }

}
