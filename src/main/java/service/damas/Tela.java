/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas;

import java.math.BigDecimal;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

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
