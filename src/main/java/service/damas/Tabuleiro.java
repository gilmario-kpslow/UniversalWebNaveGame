package service.damas;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public class Tabuleiro implements IsJsonObject {

    private Posicao[] posicoes;
    private final Tela tela;
    private final int tamanho = 50;

    public Tabuleiro() {
        this.tela = new Tela();
        this.criarPosicoes();
    }

    private void colocarPecas(Jogador jogador, int posicao) {
        for (int i = 0; i < 12; i++) {
            posicoes[i + posicao].posicionaPeca(new Peca(jogador));
        }
    }

    public void colocarPecasEmbaixo(Jogador jogador) {
        this.colocarPecas(jogador, 20);
    }

    public void colocarPecasEmcima(Jogador jogador) {
        this.colocarPecas(jogador, 0);
    }

    private void criarPosicoes() {
        posicoes = new Posicao[64];
        int k = 0;
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                String cor;
                if ((j + i) % 2 == 1) {
                    cor = "#333";
                } else {
                    cor = "#FFF";
                }
                posicoes[k] = new Posicao(cor, j * this.tamanho + (this.tela.largura - (this.tamanho * 8)) / 2, (i * this.tamanho) + (this.tela.altura - (this.tamanho * 8)) / 2);
                k++;
            }
        }
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Posicao posicoe : posicoes) {
            arrayBuilder.add(posicoe.getJsonObject());
        }
        builder.add("tela", this.tela.getJsonObject()).add("tamanho", this.tamanho).add("posicoes", arrayBuilder);
        return builder.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
