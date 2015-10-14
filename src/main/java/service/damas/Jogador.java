package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Jogador implements IsJsonObject {

    private Integer imagem;
    private String nome;
    private Integer x;
    private Integer y;

    public Jogador() {
        this.x = 0;
        this.y = 0;
    }

    public Integer getImagem() {
        return imagem;
    }

    public void setImagem(Integer imagem) {
        this.imagem = imagem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("imagem", imagem)
                .add("nome", nome)
                .add("x", x)
                .add("y", y).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
