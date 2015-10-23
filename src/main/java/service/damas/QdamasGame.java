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
    private boolean turno;
    private final Menu menu;

    public QdamasGame() {
        menu = new Menu("Aguardando Jogadores.");
        tabuleiro = new Tabuleiro(this);
    }

    protected void jogou() {
        turno = !turno;
        if (turno) {
            menu.setMensagem("É a vez do " + jogador02.getNome());
        } else {
            menu.setMensagem("É a vez do " + jogador01.getNome());
        }
    }

    public void iniciarJogo() {
        if (jogador01 != null && jogador02 != null) {
            this.tabuleiro.colocarPecasEmbaixo(jogador01);
            this.tabuleiro.colocarPecasEmcima(jogador02);
            menu.setMensagem("O jogador " + jogador01.getNome() + " começa.");
        }
    }

    public void moveDireita(Jogador jogador) {
        if (jogador.equals(jogador01) && !turno) {
            this.tabuleiro.moveDireitaSelecao01();
        } else if (jogador.equals(jogador02) && turno) {
            this.tabuleiro.moveDireitaSelecao02();
        }
    }

    public void moveEsquerda(Jogador jogador) {
        if (jogador.equals(jogador01) && !turno) {
            this.tabuleiro.moveEsquerdaSelecao01();
        } else if (jogador.equals(jogador02) && turno) {
            this.tabuleiro.moveEsquerdaSelecao02();
        }
    }

    public void moveSubir(Jogador jogador) {
        if (jogador.equals(jogador01) && !turno) {
            this.tabuleiro.moveSubirSelecao01();
        } else if (jogador.equals(jogador02) && turno) {
            this.tabuleiro.moveSubirSelecao02();
        }
    }

    public void setJogador(String nome, Integer imagem) {
        if (jogador01 == null) {
            jogador01 = new Jogador(1);
            jogador01.setNome(nome);
            jogador01.setImagem(imagem);
            jogador01.setX(100);
            jogador01.setY(5);
            menu.setMensagem("Aguardando Jogador 02.");
            tabuleiro.seleciona();
        } else if (jogador02 == null) {
            jogador02 = new Jogador(2);
            jogador02.setNome(nome);
            jogador02.setImagem(imagem);
            jogador02.setX(200);
            jogador02.setY(5);
            menu.setMensagem("Aperte start para começar.");
            tabuleiro.seleciona();
        }
    }

    public void remJogador(Jogador jogador) {
        if (jogador.equals(jogador01)) {
            jogador01 = null;
            menu.setMensagem("Jogador desconectado");
        } else if (jogador.equals(jogador02)) {
            jogador02 = null;
            menu.setMensagem("Jogador desconectado");
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
        builder.add("tabuleiro", this.tabuleiro.getJsonObject())
                .add("menu", menu.getJsonObject());
        return builder.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Jogador getJogador(String nomeJogador) {
        if (jogador01.getNome().equals(nomeJogador)) {
            return jogador01;
        } else if (jogador02.getNome().equals(nomeJogador)) {
            return jogador02;
        } else {
            return null;
        }
    }

    public Jogador getJogador01() {
        return jogador01;
    }

    public Jogador getJogador02() {
        return jogador02;
    }

    public void moveDescer(Jogador jogador) {
        if (jogador.equals(jogador01) && !turno) {
            this.tabuleiro.moveDescerSelecao01();
        } else if (jogador.equals(jogador02) && turno) {
            this.tabuleiro.moveDescerSelecao02();
        }
    }

    public void acaoBotaoA(Jogador jogador) {
        if (jogador.equals(jogador01) && !turno) {
            this.tabuleiro.marcaSelecao01();
        } else if (jogador.equals(jogador02) && turno) {
            this.tabuleiro.marcaSelecao02();
        }
    }

    public void acaoBotaoB(Jogador jogador) {
        //if (jogador.equals(jogador02)) {
        //    this.tabuleiro.marcaSelecao01();
        //} else if (jogador.equals(jogador02)) {
        //    this.tabuleiro.marcaSelecao02();
        //}
    }

}
