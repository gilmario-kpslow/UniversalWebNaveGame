package service.nave;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import service.util.Animado;
import service.util.IsJsonObject;

/**
 *
 * @author gilmario
 */
public class Nave implements IsJsonObject, Animado {

    private String imagem;
    private int x;
    private int y;
    private int velocidade;
    private int vidas;
    private boolean subir;
    private boolean descer;
    private boolean esquerda;
    private boolean direita;

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        buider.add("imagem", imagem);
        buider.add("x", x);
        buider.add("y", y);
        buider.add("velocidade", velocidade);
        return buider.build();
    }

    public Nave(String imagem) {
        this.imagem = imagem;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getVelocidade() {
        return velocidade;
    }

    public void setVelocidade(int velocidade) {
        this.velocidade = velocidade;
    }

    public int getVidas() {
        return vidas;
    }

    public void setVidas(int vidas) {
        this.vidas = vidas;
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void atualizar() {
        if (direita) {
            x += velocidade;
        }
        if (esquerda) {
            x -= velocidade;
        }
        if (descer) {
            y -= velocidade;
        }
        if (subir) {
            y += velocidade;
        }
        subir = false;
        descer = false;
        esquerda = false;
        direita = false;
    }

    public boolean isSubir() {
        return subir;
    }

    public void setSubir(boolean subir) {
        this.subir = subir;
    }

    public boolean isDescer() {
        return descer;
    }

    public void setDescer(boolean descer) {
        this.descer = descer;
    }

    public boolean isEsquerda() {
        return esquerda;
    }

    public void setEsquerda(boolean esquerda) {
        this.esquerda = esquerda;
    }

    public boolean isDireita() {
        return direita;
    }

    public void setDireita(boolean direita) {
        this.direita = direita;
    }

}
