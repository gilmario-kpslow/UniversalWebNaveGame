package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Resposta implements IsJsonObject {

    private String resposta;

    public Resposta() {
    }

    public Resposta(String resposta) {
        this.resposta = resposta;
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("info", resposta).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
