package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Posicao implements IsJsonObject {

    private Peca peca;
    private final int x;
    private final int y;
    private String cor;
    private boolean selecionada;
    private String corSelecionada = "#000";
    private boolean marcado;

    public Posicao(String cor, int x, int y) {
        this.x = x;
        this.y = y;
        this.cor = cor;
    }

    public String getCorSelecionada() {
        return corSelecionada;
    }

    public void setCorSelecionada(String corSelecionada) {
        this.corSelecionada = corSelecionada;
    }

    public boolean isSelecionada() {
        return selecionada;
    }

    public void setSelecionada(boolean selecionada) {
        this.selecionada = selecionada;
    }

    public boolean isMarcado() {
        return marcado;
    }

    public void setMarcado(boolean marcado) {
        this.marcado = marcado;
    }

    public void posicionaPeca(Peca p) {
        this.peca = p;
    }

    public Peca getPeca() {
        return peca;
    }

    public void setPeca(Peca peca) {
        this.peca = peca;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        if (peca != null) {
            builder.add("peca", this.peca.getJsonObject());
        }
        return builder.add("cor", cor)
                .add("corSelecionada", corSelecionada)
                .add("x", x)
                .add("y", y)
                .add("selecionada", selecionada)
                .add("marcado", marcado).build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {

    }

}
