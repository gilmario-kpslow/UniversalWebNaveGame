/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.util;

import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;

/**
 *
 * @author gilmario
 */
public class JsonSimpleTransforme {

    public static JsonArray arrayParaJson(List<String> list) {
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (String a : list) {
            jab.add(a);
        }
        return jab.build();
    }
}
