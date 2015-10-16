package service.damas;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public final class QdamasGame implements IsJsonObject {

    private Jogador jogador01;
    private Jogador jogador02;
    private final Tabuleiro tabuleiro;

    public QdamasGame() {
        tabuleiro = new Tabuleiro();
    }

    public void setJogador(Jogador jogador) {
        if (jogador01 != null) {
            jogador01 = jogador;
        } else {
            jogador02 = jogador;
        }
    }

    public void adicionaPecas() {
        tabuleiro.colocarPecasEmbaixo(jogador01);
        tabuleiro.colocarPecasEmcima(jogador02);
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        if (this.jogador01 != null) {
            builder.add("jogador01", jogador01.getJsonObject());
        }
        if (this.jogador02 != null) {
            builder.add("jogador02", jogador02.getJsonObject());
        }
        builder.add("tabuleiro", this.tabuleiro.getJsonObject());
        return builder.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
