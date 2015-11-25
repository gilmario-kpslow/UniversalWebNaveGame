/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas;

import service.util.Listener;
import service.util.IsJsonObject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Painel implements IsJsonObject {

    private int pontuacao01 = 0;
    private int pontuacao02 = 0;

    public int getPontuacao01() {
        return pontuacao01;
    }

    public int getPontuacao02() {
        return pontuacao02;
    }

    Listener getRemove01Listener() {
        return new Listener() {

            @Override
            public void executa() {
                pontuacao01++;
            }
        };
    }

    Listener getRemove02Listener() {
        return new Listener() {

            @Override
            public void executa() {
                pontuacao02++;
            }
        };
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        builder.add("pontuacao01", this.pontuacao01)
                .add("pontuacao02", this.pontuacao02);
        return builder.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
