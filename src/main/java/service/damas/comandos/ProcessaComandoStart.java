package service.damas.comandos;

import service.util.Comando;
import service.util.Informacao;
import service.util.Game;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoStart implements ProcessaComando {

    @Override
    public Informacao processarComando(Game game, Comando comando) {
        game.comandoStart();
        Informacao info = new Informacao(Informacao.INICIAR, game.getJsonObject());
        return info;
    }

}
