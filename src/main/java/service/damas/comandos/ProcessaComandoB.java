package service.damas.comandos;

import service.util.Comando;
import service.util.Informacao;
import service.util.Game;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoB implements ProcessaComando {

    @Override
    public Informacao processarComando(Game game, Comando comando) {
        game.acaoBotaoB(game.getJogador(comando.getJogador()));
        Informacao info = new Informacao(Informacao.MOVE, game.getJsonObject());
        return info;
    }

}
