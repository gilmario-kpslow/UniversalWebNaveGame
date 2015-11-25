package service.util;

/**
 *
 * @author gilmario
 */
public abstract class Game implements IsJsonObject {

    public abstract JogadorInterface getJogador(String nome);

    public abstract void acaoBotaoA(JogadorInterface jogador);

    public abstract void acaoBotaoB(JogadorInterface jogador);

    public abstract void moveDescer(JogadorInterface jogador);

    public abstract void moveDireita(JogadorInterface jogador);

    public abstract void moveEsquerda(JogadorInterface jogador);

    public abstract void comandoStart();

    public abstract void moveSubir(JogadorInterface jogador);

    public abstract void comandoSelect();

}
