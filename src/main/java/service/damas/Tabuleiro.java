package service.damas;

import service.util.Listener;
import service.util.IsJsonObject;
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

    private int selecionada01 = 31;
    private int selecionada02 = 0;
    private final Tela tela;
    private final int tamanho = 50;
    private Posicao macada01;
    private Posicao macada02;
    private final QdamasGame game;

    public Tabuleiro(QdamasGame game) {
        this.game = game;
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
        posicoes = new Posicao[32];
        int k = 0;
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j += 2) {
                int x;
                if (i % 2 == 0) {
                    x = j * this.tamanho + (this.tela.largura - (this.tamanho * 8)) / 2;
                } else {
                    x = j * this.tamanho + (this.tela.largura - (this.tamanho * 8)) / 2 + this.tamanho;
                }
                int y = (i * this.tamanho) + (this.tela.altura - (this.tamanho * 8)) / 2;
                Posicao posicao = new Posicao("#000", x, y);
                posicoes[k] = posicao;
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
        builder.add("tela", this.tela.getJsonObject())
                .add("tamanho", this.tamanho)
                .add("posicoes", arrayBuilder);
        return builder.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    void marcaSelecao01() {
        // Verificar se a peca marcada anterior tinha uma peca
        // Mover Peça
        Posicao posicaoAtual = posicoes[selecionada01];
        if (macada01 != null && macada01.getPeca() != null && macada01.getPeca().getJogador().equals(game.getJogador01()) && posicaoAtual.isMarcado() && posicaoAtual.getPeca() == null) {
            posicaoAtual.setPeca(macada01.getPeca());
            macada01.setPeca(null);
            verificaCaminho(this.macada01, posicaoAtual, game.getPainel().getRemove01Listener());
            desmarcarTodos();
            if (posicoes[0].equals(posicaoAtual) || posicoes[1].equals(posicaoAtual) || posicoes[2].equals(posicaoAtual) || posicoes[3].equals(posicaoAtual)) {
                posicaoAtual.getPeca().setDama();
            }
            game.jogou();
        } else {
            desmarcarTodos();
            Posicao p = posicoes[selecionada01];
            if (p.getPeca() != null) {
                marcarProximos01(p);
            }
        }
    }

    void marcaSelecao02() {
        Posicao posicaoAtual = posicoes[selecionada02];
        if (macada02 != null && macada02.getPeca() != null && macada02.getPeca().getJogador().equals(game.getJogador02()) && posicaoAtual.isMarcado() && posicaoAtual.getPeca() == null) {
            posicaoAtual.setPeca(macada02.getPeca());
            macada02.setPeca(null);
            verificaCaminho(this.macada02, posicaoAtual, game.getPainel().getRemove02Listener());
            desmarcarTodos();
            if (posicoes[31].equals(posicaoAtual) || posicoes[30].equals(posicaoAtual) || posicoes[29].equals(posicaoAtual) || posicoes[28].equals(posicaoAtual)) {
                posicaoAtual.getPeca().setDama();
            }
            game.jogou();

        } else {
            desmarcarTodos();
            Posicao p = posicoes[selecionada02];
            if (p.getPeca() != null) {
                marcarProximos02(p);
            }
        }
    }

    void moveDireitaSelecao01() {
        if (selecionada01 < 31) {
            deselecionar();
            selecionada01++;
            seleciona();
        }
    }

    void moveDireitaSelecao02() {
        if (selecionada02 < 31) {
            deselecionar();
            selecionada02++;
            seleciona();
        }
    }

    void moveEsquerdaSelecao01() {
        if (selecionada01 > 0) {
            deselecionar();
            selecionada01--;
            seleciona();
        }
    }

    void moveEsquerdaSelecao02() {
        if (selecionada02 > 0) {
            deselecionar();
            selecionada02--;
            seleciona();
        }
    }

    void moveSubirSelecao01() {
        if (selecionada01 >= 4) {
            deselecionar();
            selecionada01 -= 4;
            seleciona();
        }
    }

    void moveSubirSelecao02() {
        if (selecionada02 >= 4) {
            deselecionar();
            selecionada02 -= 4;
            seleciona();
        }
    }

    void moveDescerSelecao01() {
        if (selecionada01 <= 27) {
            deselecionar();
            selecionada01 += 4;
            seleciona();
        }
    }

    void moveDescerSelecao02() {
        if (selecionada02 <= 27) {
            deselecionar();
            selecionada02 += 4;
            seleciona();
        }
    }

    public void seleciona() {
        if (game.getJogador01() != null) {
            posicoes[selecionada01].setSelecionada(true);
            posicoes[selecionada01].setCorSelecionada(game.getJogador01().getCor());
        }
        if (game.getJogador02() != null) {
            posicoes[selecionada02].setSelecionada(true);
            posicoes[selecionada02].setCorSelecionada(game.getJogador02().getCor());
        }
    }

    private void deselecionar() {
        for (Posicao p : posicoes) {
            p.setSelecionada(false);
        }
    }

    private void desmarcarTodos() {
        for (Posicao p : posicoes) {
            p.setMarcado(false);
        }
    }

    private void marcarProximos01(Posicao p) {
        p.setMarcado(true);
        this.macada01 = p;
        int x1 = p.getX() + tamanho;
        int x2 = p.getX() - tamanho;
        int y1 = p.getY() - tamanho;
        int y2 = p.getY() + tamanho;
        for (Posicao pp : posicoes) {
            if ((pp.getX() == x1 || pp.getX() == x2) && pp.getY() == y1) {
                pp.setMarcado(true);
            }
            if ((pp.getX() == x1 || pp.getX() == x2) && (pp.getY() == y1 || pp.getY() == y2)) {
                if (pp.getPeca() != null && p.getPeca().getJogador().equals(game.getJogador01())) {
                    possuePecaInimigo01(p, pp, game.getJogador02());
                }
            }
        }

    }

    private void marcarProximos02(Posicao p) {
        p.setMarcado(true);
        this.macada02 = p;
        int x1 = p.getX() + tamanho;
        int x2 = p.getX() - tamanho;
        int y1 = p.getY() + tamanho;
        int y2 = p.getY() - tamanho;
        for (Posicao pp : posicoes) {
            if ((pp.getX() == x1 || pp.getX() == x2) && pp.getY() == y1) {
                pp.setMarcado(true);
            }
            if ((pp.getX() == x1 || pp.getX() == x2) && (pp.getY() == y1 || pp.getY() == y2)) {
                if (pp.getPeca() != null && p.getPeca().getJogador().equals(game.getJogador02())) {
                    possuePecaInimigo02(p, pp, game.getJogador01());
                }
            }
        }
    }

    private void possuePecaInimigo01(Posicao pbase, Posicao p, Jogador inimigo) {
        if (p.getPeca() != null && p.getPeca().getJogador().equals(inimigo)) {
            int x1 = p.getX() + tamanho;
            int x2 = p.getX() - tamanho;
            int y1 = p.getY() - tamanho;
            int y2 = p.getY() + tamanho;
            for (Posicao pp : posicoes) {
                if ((pp.getX() == x1 || pp.getX() == x2) && (pp.getY() == y1 || pp.getY() == y2) && pp.getPeca() == null) {
                    int xba = pbase.getX() + (2 * tamanho);
                    int xbb = pbase.getX() - (2 * tamanho);
                    int yba = pbase.getY() - (2 * tamanho);
                    int ybb = pbase.getY() + (2 * tamanho);
                    if ((pp.getX() == xba || pp.getX() == xbb) && (pp.getY() == yba || pp.getY() == ybb) && pp.getPeca() == null) {
                        pp.setMarcado(true);
                    }
                }
            }
        }
    }

    private void possuePecaInimigo02(Posicao pbase, Posicao p, Jogador inimigo) {
        if (p.getPeca() != null && p.getPeca().getJogador().equals(inimigo)) {
            int x1 = p.getX() + tamanho;
            int x2 = p.getX() - tamanho;
            int y1 = p.getY() - tamanho;
            int y2 = p.getY() + tamanho;
            for (Posicao pp : posicoes) {
                if ((pp.getX() == x1 || pp.getX() == x2) && (pp.getY() == y1 || pp.getY() == y2) && pp.getPeca() == null) {
                    int xba = pbase.getX() + (2 * tamanho);
                    int xbb = pbase.getX() - (2 * tamanho);
                    int yba = pbase.getY() - (2 * tamanho);
                    int ybb = pbase.getY() + (2 * tamanho);
                    if ((pp.getX() == xba || pp.getX() == xbb) && (pp.getY() == yba || pp.getY() == ybb) && pp.getPeca() == null) {
                        pp.setMarcado(true);
                    }
                }
            }
        }
    }

    private void verificaCaminho(Posicao anterior, Posicao atual, Listener listener) {
        int x = (anterior.getX() + atual.getX()) / 2;
        int y = (anterior.getY() + atual.getY()) / 2;

        for (Posicao p : posicoes) {
            if (p.getPeca() != null) {
                if (y == p.getY() && x == p.getX()) {
                    p.setPeca(null);
                    listener.executa();
                }
            }
        }
    }

}
