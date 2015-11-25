/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.util;

import java.math.BigDecimal;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Fundo implements IsJsonObject, Animado {

    private String imagem;
    private int y;
    private int velocidade;
    private int posicaoEmenda;

    public Fundo(String imagem) {
        this.imagem = imagem;
    }

    public Fundo(String imagem, int velocidade) {
        this.imagem = imagem;
        this.velocidade = velocidade;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        return builder.add("y", y).add("velocidade", velocidade).add("imagem", imagem).add("posicaoEmenda", posicaoEmenda).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void atualizar() {
        if (posicaoEmenda > 1000) {
            posicaoEmenda = 0;
        }
        posicaoEmenda += velocidade;
        y = posicaoEmenda - 1000;
    }

}
