package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import service.util.JogadorInterface;

/**
 *
 * @author gilmario
 */
public class Jogador implements JogadorInterface {

    private String imagem;
    private String nome;
    private String cor;
    private Integer x;
    private Integer y;
    private final Integer numero;

    public Jogador(Integer numero) {
        this.x = 0;
        this.y = 0;
        this.numero = numero;
    }

    public Jogador(Integer numero, String nome) {
        this.numero = numero;
        this.nome = nome;
    }

    public Jogador(String imagem, String nome, Integer numero) {
        this.imagem = imagem;
        this.nome = nome;
        this.numero = numero;
    }

    public Integer getNumero() {
        return numero;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    @Override
    public String getNome() {
        return nome;
    }

    @Override
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

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        return buider.add("imagem", imagem)
                .add("nome", nome)
                .add("cor", cor)
                .add("x", x)
                .add("y", y).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
