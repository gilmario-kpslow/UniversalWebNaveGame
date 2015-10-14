package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Peca implements IsJsonObject {

    private Integer imagem;
    private Posicao posicao;

    public Peca() {
    }

    public Peca(Integer imagem, Posicao posicao) {
        this.imagem = imagem;
        this.posicao = posicao;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("imagem", imagem).add("posicao", posicao.getJsonObject()).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
