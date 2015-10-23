package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Menu implements IsJsonObject {

    private String mensagem;

    public Menu() {
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Menu(String mensagem) {
        this.mensagem = mensagem;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("mensagem", mensagem).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
