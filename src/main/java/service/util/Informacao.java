package service.util;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonStructure;

/**
 *
 * @author gilmario
 */
public class Informacao implements IsJsonObject {

    public static final String USUARIO = "usuario";
    public static final String SELECT = "select";
    public static final String REM_USUARIO = "rem_usuario";
    public static final String INICIAR = "iniciar";
    public static final String COMANDO = "comando";
    public static final String MOVE = "move";
    public static final String RESTAURAR = "restaurar";
    public static final String CORES = "cores";

    private String tipo;
    private JsonStructure valor;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Informacao() {
    }

    public Informacao(String tipo, JsonObject valor) {
        this.tipo = tipo;
        this.valor = valor;
    }

    public Informacao(String tipo, JsonArray valor) {
        this.tipo = tipo;
        this.valor = valor;
    }

    public String toJson() {
        return getJsonObject().toString();
    }

    public JsonStructure getValor() {
        return valor;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        buider.add("tipo", tipo);
        buider.add("valor", valor);
        return buider.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        this.tipo = object.getString("tipo");
        this.valor = object.getJsonObject("valor");
    }

}
